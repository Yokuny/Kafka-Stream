import type { KafkaEvent, OrderCreatedPayload } from '@kafka-stream/shared';
import type { Producer } from 'kafkajs';
import type { Env } from '../config/env.js';

export const buildOrderCreatedEvent = (payload: OrderCreatedPayload): KafkaEvent<OrderCreatedPayload> => {
  return {
    metadata: {
      eventId: crypto.randomUUID(),
      eventType: 'order.created',
      version: 1,
      source: 'producer',
      timestamp: new Date().toISOString(),
    },
    payload,
  };
};

export const publishOrderCreated = async (producer: Producer, env: Env, event: KafkaEvent<OrderCreatedPayload>): Promise<void> => {
  await producer.send({
    topic: env.KAFKA_TOPIC_ORDERS,
    messages: [
      {
        key: event.payload.customerId,
        value: JSON.stringify(event),
      },
    ],
  });
};
