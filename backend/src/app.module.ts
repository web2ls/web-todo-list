import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
  	MongooseModule.forRoot('mongodb://localhost/todos', { useNewUrlParser: true }),
  	TodosModule,
  	CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
