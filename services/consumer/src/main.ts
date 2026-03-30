import 'reflect-metadata';
import pino from 'pino';
import { env } from './config/env.js';
import { createDataSource } from './database/data-source.js';
import { bootstrapConsumer } from './kafka/consumer.js';

const logger = pino({ level: env.CONSUMER_LOG_LEVEL });

const bootstrap = async (): Promise<void> => {
  // 1. Connect to PostgreSQL
  logger.info('Connecting to PostgreSQL...');
  const dataSource = createDataSource(env);
  await dataSource.initialize();
  logger.info('PostgreSQL connected');

  // 2. Start Kafka consumer
  logger.info('Starting Kafka consumer...');
  const { disconnect } = await bootstrapConsumer(env, dataSource, logger);

  // 3. Graceful shutdown
  const shutdown = async (signal: string): Promise<void> => {
    logger.warn({ signal }, 'Shutdown signal received — closing gracefully');
    await disconnect(); // stop consuming, flush in-flight messages
    await dataSource.destroy(); // close DB connection pool
    logger.info('Shutdown complete');
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Keep process alive — consumer.run() is non-blocking
  logger.info('Consumer ready — waiting for messages');
};

bootstrap().catch((error) => {
  logger.error({ error }, 'Fatal: failed to start consumer');
  process.exit(1);
});
