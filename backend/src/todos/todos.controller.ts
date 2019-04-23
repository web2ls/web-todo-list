import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Get('/:categoryId')
	@UseGuards(AuthGuard())
	async getByCategory(@Param('categoryId') categoryId, @Res() res) {
		const todos = await this.todosService.findTodosByCategory(categoryId);
		return res.status(HttpStatus.OK).json(todos);
	}

	@Get('/:categoryId/amount')
	@UseGuards(AuthGuard())
	async getTodosAmountByCategory(@Param('categoryId') categoryId, @Res() res) {
		const todosAmount = await this.todosService.findTodosAmountByCategory(categoryId);
		return res.status(HttpStatus.OK).json(todosAmount);		
	}

	@Post('/create')
	@UseGuards(AuthGuard())
	async createNew(@Body() createTodoDto: CreateTodoDto, @Res() res) {
		const createdTodo = await this.todosService.createTodo(createTodoDto);
		return res.status(HttpStatus.OK).json(createdTodo);
	}

	@Put('/update')
	@UseGuards(AuthGuard())
	async update(@Body() updateTodoDto, @Res() res) {
		const updatedTodoId = updateTodoDto._id;
		const updatedTodo = await this.todosService.updateTodo(updatedTodoId, updateTodoDto);
		if (!updatedTodo)
			throw new NotFoundException('Task not found');
		return res.status(HttpStatus.OK).json(updatedTodo);
	}

	@Delete('/delete/:id')
	@UseGuards(AuthGuard())
	async delete(@Param('id') id, @Res() res) {
		const deletedTodo = await this.todosService.deleteTodo(id);
		if (!deletedTodo)
			throw new NotFoundException('Task not found');
		res.status(HttpStatus.OK).json(deletedTodo);
	}

	@Delete('/delete/bycategory/:id')
	@UseGuards(AuthGuard())
	async deleteByCategory(@Param('id') id, @Res() res) {
		const deletedTodos = await this.todosService.deleteTodosByCategory(id);
		if (!deletedTodos)
			throw new NotFoundException('Category not found');
		res.status(HttpStatus.OK).json(true);
	}
}
