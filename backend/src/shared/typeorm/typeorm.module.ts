import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  InjectDataSource,
  TypeOrmModule as NestTypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';

export const DEFAULT_DB_NAME = 'DEFAULT_DB_NAME';
export const InjectDefaultDataSource = () => InjectDataSource(DEFAULT_DB_NAME);

@Module({
  imports: [
    NestTypeOrmModule.forRootAsync({
      name: DEFAULT_DB_NAME,
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        console.log('asd', configService.get('database.username'), __dirname);

        return {
          type: configService.get<DatabaseType>(
            'database.type',
            'postgres',
          ) as 'postgres',
          host: configService.get<string>('database.host', '127.0.0.1'),
          port: configService.get<number>('database.port', 5432),
          username: configService.get<string>('database.username', 'postgres'),
          password: configService.get<string>('database.password', 'postgres'),
          database: configService.get<string>('database.database', 'postgres'),
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          migrations: [`${__dirname}/**/migrations/*-migration{.ts,.js}`],
          migrationsTableName: 'migrations',
          migrationsRun: configService.get<boolean>(
            'database.migrationsRun',
            false,
          ),
          synchronize: configService.get<boolean>('database.synchronize', true),
          logging: configService.get<boolean>('database.logging', true),
          autoLoadEntities: true,
          cache: configService.get<boolean>('database.cache.enabled', false)
            ? {
                alwaysEnabled: true,
                type: 'redis',
                options: {
                  username: configService.get<string>(
                    'redis.username',
                    'default',
                  ),
                  password: configService.get<string>('redis.password', ''),
                  socket: {
                    host: configService.get<string>('redis.host', '127.0.0.1'),
                    port: configService.get<number>('redis.port', 6379),
                  },
                },
              }
            : undefined,
          extra: {
            pool: {
              max: configService.get<number>('database.pool.max', 5),
              min: configService.get<number>('database.pool.min', 0),
              acquireTimeoutMillis: configService.get<number>(
                'database.pool.acquire',
                30000,
              ),
              idleTimeoutMillis: configService.get<number>(
                'database.pool.idle',
                10000,
              ),
            },
          },
        } as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
  ],
  exports: [NestTypeOrmModule],
})
export class TypeOrmModule {}
