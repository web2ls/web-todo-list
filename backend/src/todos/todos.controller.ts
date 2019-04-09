import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
	@Get()
	getAll(): string {
		return 'test';
	}

	@Post()
	createNew(@Body() createTodoDto: CreateTodoDto): string {
		return 'new todo';
	}

	@Put(':id')
	update() {

	}

	@Delete(':id')
	delete() {

	}
}
