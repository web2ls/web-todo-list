import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoSchema } from './schemas/todos.schema';
import { PassportModule } from '@nestjs/passport';
import { ArchiveTodosService } from '../archive-todos/archive-todos.service';
import { ArchiveTodoSchema } from '../archive-todos/schemas/archive-todo.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Todo', schema:  TodoSchema }]),
		MongooseModule.forFeature([{name: 'ArchiveTodos', schema: ArchiveTodoSchema}]),
		PassportModule.register({defaultStrategy: 'jwt', session: false}),
	],
	controllers: [TodosController],
	providers: [TodosService, ArchiveTodosService]
})
export class TodosModule {}
