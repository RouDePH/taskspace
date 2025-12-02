// src/shared/typeorm/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config as loadEnv } from 'dotenv';
import configuration from './src/shared/config/configuration';

const ENV = process.env.NODE_ENV ?? 'development';
loadEnv({ path: `.env.${ENV}` });
loadEnv({ path: `.env.${ENV}.local` });
loadEnv({ path: `.env` });

const db = configuration().database;

export default new DataSource({
  type: db.type as any,
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
});
