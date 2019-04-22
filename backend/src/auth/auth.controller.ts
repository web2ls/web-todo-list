import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {}

	@Post()
	async login(@Body() loginUserDto: LoginUserDto, @Res() res) {
		const loginResult = await this.authService.validUserByPassword(loginUserDto);
		res.status(HttpStatus.OK).json(loginResult);
	}
}
