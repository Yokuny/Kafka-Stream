import { OrderCreatedPayloadSchema } from '@kafka-stream/shared';
import type { FastifyInstance } from 'fastify';
import type { Producer } from 'kafkajs';
import type { Env } from '../config/env.js';
import { buildOrderCreatedEvent, publishOrderCreated } from '../kafka/publisher.js';

export const registerOrderRoutes = (app: FastifyInstance, producer: Producer, env: Env): void => {
  app.post('/orders', async (request, reply) => {
    const parsed = OrderCreatedPayloadSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid payload', details: parsed.error.issues });
    }

    const event = buildOrderCreatedEvent(parsed.data);

    try {
      await publishOrderCreated(producer, env, event);
      return reply.status(201).send({ status: 'Order placed', eventId: event.metadata.eventId });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({ error: 'Failed to place order' });
    }
  });

  app.get('/health', async () => {
    return { status: 'healthy' };
  });
};
