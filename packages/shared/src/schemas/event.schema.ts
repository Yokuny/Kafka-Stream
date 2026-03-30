import { z } from 'zod';

export const EventMetadataSchema = z.object({
  eventId: z.string().uuid(),
  eventType: z.string(),
  version: z.number().int().positive(),
  source: z.string(),
  correlationId: z.string().optional(),
  timestamp: z.string().datetime(),
});

// Base envelope schema — use .extend({ payload: MySchema }) for typed events
export const KafkaEventSchema = z.object({
  metadata: EventMetadataSchema,
  payload: z.unknown(),
});
