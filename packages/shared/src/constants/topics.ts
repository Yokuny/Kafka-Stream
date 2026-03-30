export const Topics = {
  ORDERS_CREATED: 'orders.created',
  ORDERS_CREATED_DLQ: 'orders.created.dlq',
} as const;

export type Topic = (typeof Topics)[keyof typeof Topics];
