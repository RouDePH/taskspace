import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DEFAULT_DB_NAME } from './shared';
import { SharedModule } from './shared/shared.module';
import { TodoEntity } from './todo.entity';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([TodoEntity], DEFAULT_DB_NAME),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
