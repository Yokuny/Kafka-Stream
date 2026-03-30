import type { z } from 'zod';
import type { EventMetadataSchema } from '../schemas/event.schema.js';

export type EventStatus = 'received' | 'processed' | 'failed';

export type EventMetadata = z.infer<typeof EventMetadataSchema>;

export interface KafkaEvent<T = unknown> {
  readonly metadata: EventMetadata;
  readonly payload: T;
}
