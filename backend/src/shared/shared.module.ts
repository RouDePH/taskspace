import { Module } from '@nestjs/common';

import { ConfigModule } from './config';
import { TypeOrmModule } from './typeorm';
import { SwaggerModule } from './swagger';

@Module({
  imports: [ConfigModule, TypeOrmModule, SwaggerModule],
  exports: [ConfigModule, TypeOrmModule, SwaggerModule],
})
export class SharedModule {}
