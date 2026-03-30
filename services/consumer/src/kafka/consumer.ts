import { type EachMessagePayload, Kafka } from 'kafkajs';
import type { Logger } from 'pino';
import type { DataSource } from 'typeorm';
import type { Env } from '../config/env.js';
import { parseOrderEvent } from './order.processor.js';

export const bootstrapConsumer = async (env: Env, dataSource: DataSource, logger: Logger): Promise<{ disconnect: () => Promise<void> }> => {
  const kafka = new Kafka({
    clientId: env.KAFKA_CLIENT_ID,
    brokers: env.KAFKA_BROKERS.split(','),
  });

  const consumer = kafka.consumer({ groupId: env.KAFKA_GROUP_ID_CONSUMER });

  await consumer.connect();

  await consumer.subscribe({ topic: env.KAFKA_TOPIC_ORDERS, fromBeginning: true });

  await consumer.run({
    eachMessage: async (payload: EachMessagePayload) => {
      const { topic, partition, message } = payload;

      const result = parseOrderEvent(message.value?.toString());

      if (!result.success) {
        logger.error({ topic, partition, err: result.error.message }, 'Invalid message — schema validation failed');
        return;
      }

      const event = result.data;
      logger.info({ eventId: event.metadata.eventId, eventType: event.metadata.eventType, topic, partition }, 'Event received');

      // TODO: persist event.payload via dataSource
      void dataSource;
    },
  });

  const disconnect = async () => {
    await consumer.disconnect();
  };

  return { disconnect };
};
