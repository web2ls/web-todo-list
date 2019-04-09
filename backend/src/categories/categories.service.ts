import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './interfaces/Category.interface';

@Injectable()
export class CategoriesService {
	constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

	async getAllCategories(): Promise<Category[]> {
		return await this.categoryModel.find().exec();
	}

	async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
		const createdCategory = new this.categoryModel(createCategoryDto);
		return await createdCategory.save();
	}
}
