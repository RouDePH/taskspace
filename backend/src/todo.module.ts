import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DEFAULT_DB_NAME } from './shared';
import { SharedModule } from './shared/shared.module';
import { TodoEntity } from './todo.entity';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([TodoEntity], DEFAULT_DB_NAME),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
