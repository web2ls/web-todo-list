import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './schemas/Category.schema';
import { CategoriesService } from './categories.service';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		MongooseModule.forFeature([{name: 'Category', schema: CategorySchema}]),
		PassportModule.register({ defaultStrategy: 'jwt', session: false }),
	],
  	controllers: [CategoriesController],
  	providers: [CategoriesService]
})
export class CategoriesModule {}
