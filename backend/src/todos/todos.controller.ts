import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Get('/:categoryId')
	async getByCategory(@Param('categoryId') categoryId, @Res() res) {
		const todos = await this.todosService.findTodosByCategory(categoryId);
		return res.status(HttpStatus.OK).json(todos);
	}

	@Get('/:categoryId/amount')
	async getTodosAmountByCategory(@Param('categoryId') categoryId, @Res() res) {
		const todosAmount = await this.todosService.findTodosAmountByCategory(categoryId);
		return res.status(HttpStatus.OK).json(todosAmount);		
	}

	@Post('/create')
	async createNew(@Body() createTodoDto: CreateTodoDto, @Res() res) {
		const createdTodo = await this.todosService.createTodo(createTodoDto);
		return res.status(HttpStatus.OK).json(createdTodo);
	}

	@Put('/update/:id')
	async update(@Body() updateTodoDto, @Param('id') id, @Res() res) {
		const updatedTodo = await this.todosService.updateTodo(id, updateTodoDto);
		return res.status(HttpStatus.OK).json(updatedTodo);
	}

	@Delete('/delete/:id')
	async delete(@Param('id') id, @Res() res) {
		const deletedTodo = await this.todosService.deleteTodo(id);
		res.status(HttpStatus.OK).json(deletedTodo);
	}
}
