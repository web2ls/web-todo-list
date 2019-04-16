import { Controller, Get, Post, Put, Delete, Body, Param, Req, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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

	@Post('/create')
	async createNew(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
		console.log(createCategoryDto);
		const createdCategory = await this.categoryService.createCategory(createCategoryDto);
		return res.status(HttpStatus.OK).json(createdCategory);
	}

	@Put('/update/:categoryId')
	async updateOne(@Body() updateCategoryDto: UpdateCategoryDto, @Param('categoryId') categoryId, @Res() res) {
		const updatedCategory = await this.categoryService.updateCategory(categoryId, updateCategoryDto);
		if (!updatedCategory)
			throw new NotFoundException('Category not found');
		return res.status(HttpStatus.OK).json(updatedCategory);
	}

	@Delete('/delete/:categoryId')
	async deleteOne(@Param('categoryId') categoryId, @Res() res) {
		const deletedCategory = await this.categoryService.deleteCategory(categoryId);
		if (!deletedCategory)
			throw new NotFoundException('Category not found');
		return res.status(HttpStatus.OK).json(deletedCategory);
	}
}
