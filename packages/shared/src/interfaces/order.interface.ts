import type { z } from 'zod';
import type { OrderCreatedPayloadSchema } from '../schemas/order.schema.js';
import type { KafkaEvent } from './event.interface.js';

export type OrderStatus = 'pending' | 'confirmed' | 'cancelled';

export type OrderCreatedPayload = z.infer<typeof OrderCreatedPayloadSchema>;

export type OrderCreatedEvent = KafkaEvent<OrderCreatedPayload>;
