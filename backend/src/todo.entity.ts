import { ApiProperty } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';

import { DEFAULT_DB_NAME } from './shared';
import { Expose } from 'class-transformer';

export type TodosRepository = Repository<TodoEntity>;
export const InjectTodosRepository = () =>
  InjectRepository(TodoEntity, DEFAULT_DB_NAME);

@Entity({ name: 'todos' })
export class TodoEntity extends BaseEntity {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @ApiProperty({ example: 'Ship production build' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Expose()
  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
