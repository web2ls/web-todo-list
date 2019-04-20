import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto, @Res() res) {
		const token = await this.usersService.createUser(createUserDto);
		res.status(HttpStatus.OK).json({message: 'New user has been created'});
	}
}
