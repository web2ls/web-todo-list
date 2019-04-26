import { Module } from '@nestjs/common';
import { ArchiveTodosService } from './archive-todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchiveTodoSchema } from './schemas/archive-todo.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{name: 'ArchiveTodos', schema: ArchiveTodoSchema}]),
	],
  	providers: [ArchiveTodosService],
  	exports: [ArchiveTodosService]
})
export class ArchiveTodosModule {}
