import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import {
  ApiOperation,
  ApiResponse as ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse } from './shared';
import { TodoInputDto, TodoOutputDto, TodoUpdateDto } from './dto';

@ApiTags('todos')
@Controller({ path: 'todos', version: '1' })
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'List all todos' })
  @ApiResponse(TodoOutputDto, { isArray: true })
  getTodos(): Promise<TodoOutputDto[]> {
    return this.todoService.listTodos();
  }

  @Post()
  @ApiOperation({ summary: 'Create todo' })
  @ApiResponse(TodoOutputDto, { status: 201 })
  createTodo(@Body() body: TodoInputDto): Promise<TodoOutputDto> {
    return this.todoService.createTodo(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update todo by id' })
  @ApiResponse(TodoOutputDto)
  updateTodo(
    @Param('id') id: string,
    @Body() body: TodoUpdateDto,
  ): Promise<TodoOutputDto> {
    return this.todoService.updateTodo(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete todo by id' })
  @ApiOkResponse({ status: 204, description: 'Todo deleted' })
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}
