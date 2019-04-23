import { Controller, Get, Post, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto, @Res() res) {
		const token = await this.usersService.createUser(createUserDto);
		res.status(HttpStatus.OK).json({message: 'New user has been created'});
	}
}
