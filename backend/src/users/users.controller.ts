import { Controller, Get, Post, Body, Res, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

require('dotenv').config({encoding: 'utf8'});

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto, @Res() res) {
		const users = await this.usersService.findAll();
		if (users.length)
			throw new UnauthorizedException();
		const token = await this.usersService.createUser(createUserDto);
		res.status(HttpStatus.OK).json({message: 'New user has been created'});
	}

	@Get()
	async initializeUser(@Res() res) {
		const users = await this.usersService.findAll();
		if (users.length)
			throw new UnauthorizedException();

		const user = {
			email: process.env.EMAIL,
			password: process.env.PASSWORD
		};
		const token = await this.usersService.createUser(user);
		res.status(HttpStatus.OK).json({message: 'New user has been created'});
	}
}
