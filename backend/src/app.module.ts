import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const DATABASE = process.env.DATABASE || 'mongodb://localhost/todos';

@Module({
  imports: [
  	MongooseModule.forRoot('mongodb://localhost/todos', { useNewUrlParser: true }),
  	TodosModule,
  	CategoriesModule,
  	AuthModule,
  	UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
