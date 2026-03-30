// ─── Constants ────────────────────────────────────────────────────────────────

export type { Topic } from './constants/topics.js';
export { Topics } from './constants/topics.js';

// ─── Interfaces ───────────────────────────────────────────────────────────────
export type { EventMetadata, EventStatus, KafkaEvent } from './interfaces/event.interface.js';
export type { OrderCreatedEvent, OrderCreatedPayload, OrderStatus } from './interfaces/order.interface.js';
export type { Result } from './interfaces/result.interface.js';

// ─── Schemas (Zod) ────────────────────────────────────────────────────────────
export { EventMetadataSchema, KafkaEventSchema } from './schemas/event.schema.js';
export { OrderCreatedEventSchema, OrderCreatedPayloadSchema } from './schemas/order.schema.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { pipe } from './utils/pipe.js';
export { chainResult, err, isErr, isOk, mapResult, ok } from './utils/result.js';
