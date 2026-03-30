import { z } from 'zod';
import { KafkaEventSchema } from './event.schema.js';

export const OrderCreatedPayloadSchema = z.object({
  orderId: z.string(),
  customerId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive(),
  amount: z.number().positive(),
  metadata: z.record(z.unknown()).optional(),
});

export const OrderCreatedEventSchema = KafkaEventSchema.extend({
  payload: OrderCreatedPayloadSchema,
});
