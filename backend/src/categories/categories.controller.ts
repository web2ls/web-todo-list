import { Controller, Get, Post, Put, Delete, Body, Param, Req, Res, HttpStatus, NotFoundException, BadRequestException, UseGuards } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategorySchema } from './schemas/Category.schema';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}
	@Get()
	@UseGuards(AuthGuard())
	async findAll(@Res() res, @Req() req) {
		console.log(req.headers);
		const categories = await this.categoryService.getAllCategories();
		return res.status(HttpStatus.OK).json(categories);
	}

	@Post('/create')
	async createNew(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
		console.log(createCategoryDto);
		const createdCategory = await this.categoryService.createCategory(createCategoryDto);
		if (!createdCategory)
			throw new BadRequestException('Category name already exists');
		return res.status(HttpStatus.OK).json(createdCategory);
	}

	@Put('/update')
	async updateOne(@Body() updateCategoryDto: UpdateCategoryDto, @Res() res) {
		const updatedCategory = await this.categoryService.updateCategory(updateCategoryDto._id, updateCategoryDto);
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
