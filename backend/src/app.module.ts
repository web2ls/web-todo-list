import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArchiveTodosModule } from './archive-todos/archive-todos.module';

require('dotenv').config({encoding: 'utf8'});

@Module({
  imports: [
  	MongooseModule.forRoot(process.env.DATABASE, { useNewUrlParser: true }),
  	TodosModule,
  	CategoriesModule,
  	AuthModule,
  	UsersModule,
  	ArchiveTodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
