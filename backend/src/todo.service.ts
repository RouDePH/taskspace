import { Injectable, NotFoundException } from '@nestjs/common';
import {
  InjectTodosRepository,
  TodoEntity,
  TodosRepository,
} from './todo.entity';
import { TodoInputDto, TodoUpdateDto } from './dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectTodosRepository()
    private readonly repository: TodosRepository,
  ) {}

  async listTodos(): Promise<TodoEntity[]> {
    return this.repository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async createTodo({ title, completed }: TodoInputDto): Promise<TodoEntity> {
    const todo = this.repository.create({
      title: title.trim(),
      completed: completed,
    });

    return this.repository.save(todo);
  }

  async updateTodo(id: string, updates: TodoUpdateDto): Promise<TodoEntity> {
    const todo = await this.repository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Task not found');
    }

    if (typeof updates.title === 'string') {
      todo.title = updates.title.trim();
    }

    if (typeof updates.completed === 'boolean') {
      todo.completed = updates.completed;
    }

    return this.repository.save(todo);
  }

  async deleteTodo(id: string): Promise<void> {
    const result = await this.repository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
