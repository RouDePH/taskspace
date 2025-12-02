declare global {
  const enum NODE_ENV {
    DEVELOPMENT = 'development',
    TEST = 'test',
    PRODUCTION = 'production',
  }

  namespace NodeJS {
    interface ProcessEnv {
      NAME: string;
      VERSION: string;
      PORT: string;
      DOC: string;
      DESCRIPTION: string;
      NODE_ENV: 'development' | 'test' | 'production';

      DB_TYPE: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;

      DB_LOGGING: string;
      DB_SYNCHRONIZE: string;
      DB_MIGRATIONS_RUN: string;

      DB_POOL_MAX: string;
      DB_POOL_MIN: string;
      DB_POOL_ACQUIRE: string;
      DB_POOL_IDLE: string;

      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
    }
  }
}

export {};
