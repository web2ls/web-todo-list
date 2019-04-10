import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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

	async updateCategory(categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
		return await this.categoryModel.findByIdAndUpdate(categoryId, updateCategoryDto, { new: true });
	}

	async deleteCategory(categoryId: string): Promise<any> {
		const deletedCategory = await this.categoryModel.findByIdAndRemove(categoryId);
		return deletedCategory;
	}
}
