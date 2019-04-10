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

	async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
		const createdTodo = new this.todoModel(createTodoDto);
		return createdTodo.save();
	}

	async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
		return this.todoModel.findByIdAndUpdate(id, updateTodoDto, {new: true});
	}

	async deleteTodo(id: string): Promise<Todo> {
		return await this.todoModel.findByIdAndRemove(id);

	}
}
