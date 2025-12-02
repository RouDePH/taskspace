import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';

const ENV = process.env.NODE_ENV ?? 'development';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`.env.${ENV}`, `.env.${ENV}.local`, '.env'],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
