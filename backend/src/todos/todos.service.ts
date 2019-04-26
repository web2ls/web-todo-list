import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ArchiveTodosService } from '../archive-todos/archive-todos.service';
import { CreateArchiveTodoDto } from '../archive-todos/dto/create-archive-todo.dto';

@Injectable()
export class TodosService {
	constructor(
		@InjectModel('Todo') private readonly todoModel: Model<Todo>,
		private readonly archiveTodosService: ArchiveTodosService
	) {}

	async findTodosByCategory(categoryId: string): Promise<Todo[]> {
		return await this.todoModel.find({category: categoryId}).exec();
	}

	async findTodosAmountByCategory(categoryId: string): Promise<number> {
		const todos = await this.todoModel.find({category: categoryId, isComplete: false}).exec();
		return todos.length;
	}

	async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
		const createdTodo = new this.todoModel(createTodoDto);
		return await createdTodo.save();
	}

	async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
		if (!updateTodoDto.isComplete)
			return await this.todoModel.findByIdAndUpdate(id, updateTodoDto, {new: true});

		const preparedArchiveTodo: CreateArchiveTodoDto = {
			content: updateTodoDto.content,
			isComplete: updateTodoDto.isComplete,
			category: updateTodoDto.category
		};
		const newArchiveTodo = await this.archiveTodosService.create(preparedArchiveTodo)
		

		const deletedTodo = await this.todoModel.findByIdAndRemove(id);
		return newArchiveTodo;
	}

	async deleteTodo(id: string): Promise<Todo | boolean> {
		try {
			return await this.todoModel.findByIdAndRemove(id);
		} catch(error) {
			return false;
		}

	}

	async deleteTodosByCategory(id: string): Promise<any> {
		try {
			return await this.todoModel.deleteMany({category: id});
		} catch(error) {
			return false;
		}
	}
}
