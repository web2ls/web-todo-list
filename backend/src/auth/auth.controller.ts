import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {}
	// @Post('register')
	// async registerUser(@Body() createUserDto: CreateUserDto, @Res() res) {
	// 	console.log(createUserDto);
	// 	const token = await this.authService.signUp(createUserDto);
	// 	res.status(HttpStatus.OK).json({token});
	// }

	// @Post('login')
	// async loginUser(@Body() createUserDto: CreateUserDto, @Res() res) {
		
	// }
}
