import Fastify from 'fastify';
import { env } from './config/env.js';
import { bootstrapProducer } from './kafka/client.js';
import { registerOrderRoutes } from './routes/orders.js';

const bootstrap = async (): Promise<void> => {
  const app = Fastify({ logger: { level: env.PRODUCER_LOG_LEVEL } });

  // 1. Connect to Kafka
  app.log.info('Connecting to Kafka...');
  const { producer, disconnect } = await bootstrapProducer(env);
  app.log.info({ brokers: env.KAFKA_BROKERS }, 'Kafka producer connected');

  // 2. Register routes
  registerOrderRoutes(app, producer, env);

  // 3. Graceful shutdown — always disconnect from Kafka cleanly
  // This prevents messages from being lost mid-flight on SIGTERM (k8s pod eviction)
  const shutdown = async (signal: string): Promise<void> => {
    app.log.warn({ signal }, 'Shutdown signal received — closing gracefully');
    await app.close(); // stop accepting new HTTP requests
    await disconnect(); // flush and disconnect Kafka producer
    app.log.info('Shutdown complete');
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // 4. Start HTTP server
  await app.listen({ port: env.PRODUCER_PORT, host: '0.0.0.0' });
  app.log.info({ port: env.PRODUCER_PORT }, 'Producer HTTP server listening');
};

bootstrap().catch((error) => {
  console.error('Fatal: failed to start producer', error);
  process.exit(1);
});
