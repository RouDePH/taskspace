export default () => ({
  app: {
    name: process.env.NAME ?? 'Taskspace API',
    version: process.env.VERSION ?? '1.0.0',
    host: process.env.HOST ?? '127.0.0.1',
    port: toNumber(process.env.PORT, 3000),
    doc: process.env.DOC ?? '/docs',
    description:
      process.env.DESCRIPTION ??
      'REST API for the Taskspace todo demo (Nest + TypeORM + Postgres)',
    env: process.env.NODE_ENV ?? 'development',
    frontend: {
      origin: process.env.APP_FRONTEND_ORIGIN ?? 'http://localhost:5173',
    },
  },
  database: {
    type: process.env.DB_TYPE ?? 'postgres',
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: toNumber(process.env.DB_PORT, 5432),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'postgres',
    logging: toBool(process.env.DB_LOGGING, false),
    synchronize: toBool(process.env.DB_SYNCHRONIZE, false),
    migrationsRun: toBool(process.env.DB_MIGRATIONS_RUN, false),
    cache: {
      enabled: toBool(process.env.DB_CACHE, false),
    },
    pool: {
      max: toNumber(process.env.DB_POOL_MAX, 5),
      min: toNumber(process.env.DB_POOL_MIN, 0),
      acquire: toNumber(process.env.DB_POOL_ACQUIRE, 30000),
      idle: toNumber(process.env.DB_POOL_IDLE, 10000),
    },
  },
  redis: {
    host: process.env.REDIS_HOST ?? '127.0.0.1',
    port: toNumber(process.env.REDIS_PORT, 6379),
    username: process.env.REDIS_USERNAME ?? 'default',
    password: process.env.REDIS_PASSWORD,
  },
});

function toNumber(value: string | undefined, fallback: number): number {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function toBool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  return value === 'true' || value === '1';
}
