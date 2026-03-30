import 'reflect-metadata';
import type { DataSource } from 'typeorm';
import { env } from './config/env.js';
import { createDataSource } from './database/data-source.js';
import { bootstrapConsumer } from './kafka/consumer.js';

export async function init(): Promise<AppContext> {
  const dataSource = createDataSource(env);
  await dataSource.initialize();

  const { disconnect } = await bootstrapConsumer(env, dataSource);
  return { dataSource, disconnect };
}

export interface AppContext {
  dataSource: DataSource;
  disconnect: () => Promise<void>;
}
