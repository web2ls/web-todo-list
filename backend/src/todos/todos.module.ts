import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoSchema } from './schemas/todos.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Todo', schema:  TodoSchema}]),
		PassportModule.register({defaultStrategy: 'jwt', session: false}),
	],
	controllers: [TodosController],
	providers: [TodosService]
})
export class TodosModule {}
