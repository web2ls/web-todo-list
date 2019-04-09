import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './schemas/Category.schema';
import { CategoriesService } from './categories.service';

@Module({
	imports: [MongooseModule.forFeature([{name: 'Category', schema: CategorySchema}])],
  	controllers: [CategoriesController],
  	providers: [CategoriesService]
})
export class CategoriesModule {}
