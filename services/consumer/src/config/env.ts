import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  KAFKA_BROKERS: z.string(),
  KAFKA_CLIENT_ID: z.string().default('kafka-stream-consumer'),
  KAFKA_GROUP_ID_CONSUMER: z.string().default('kafka-stream-consumer-group'),
  KAFKA_TOPIC_ORDERS: z.string().default('orders.created'),
  KAFKA_TOPIC_ORDERS_DLQ: z.string().default('orders.created.dlq'),
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_PORT: z.coerce.number().int().default(5432),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_SSL: z
    .string()
    .default('false')
    .transform((v: string) => v === 'true'),
  CONSUMER_LOG_LEVEL: z.string().default('info'),
  CONSUMER_MAX_RETRIES: z.coerce.number().int().default(3),
  CONSUMER_RETRY_DELAY_MS: z.coerce.number().int().default(1000),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
