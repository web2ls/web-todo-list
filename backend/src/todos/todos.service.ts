import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
	constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

	async findTodosByCategory(categoryId: string): Promise<Todo[]> {
		return await this.todoModel.find({category: categoryId}).exec();
	}

	async findTodosAmountByCategory(categoryId: string): Promise<number> {
		const todos = await this.todoModel.find({category: categoryId, isComplete: false}).exec();
		return todos.length;
	}

	async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
		const createdTodo = new this.todoModel(createTodoDto);
		return createdTodo.save();
	}

	async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo | boolean> {
		try {
			console.log('call service');
			return this.todoModel.findByIdAndUpdate(id, updateTodoDto, {new: true});
		} catch(error) {
			console.log('error in service');
			return false;
		}
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
