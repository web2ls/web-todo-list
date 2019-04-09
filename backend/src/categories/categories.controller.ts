import { Controller, Get, Post, Put, Delete, Body, Req, Res, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategorySchema } from './schemas/Category.schema';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}
	@Get()
	async findAll(@Res() res) {
		const categories = await this.categoryService.getAllCategories();
		return res.status(HttpStatus.OK).json(categories);
	}

	@Post()
	async createNew(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
		const createdCategory = await this.categoryService.createCategory(createCategoryDto);
		return res.status(HttpStatus.OK).json(createdCategory);
	}
}
