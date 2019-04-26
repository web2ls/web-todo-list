import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArchiveTodoDto } from './dto/create-archive-todo.dto';
import { ArchiveTodo } from './interfaces/archive-todo.interface';

@Injectable()
export class ArchiveTodosService {
	constructor(
		@InjectModel('ArchiveTodos') private readonly archiveTodoModel: Model<ArchiveTodo>,
	) {}

	async create(createArchiveDto: CreateArchiveTodoDto) {
		const createdArchiveTodo = new this.archiveTodoModel(createArchiveDto);
		return await createdArchiveTodo.save();
	}
}
