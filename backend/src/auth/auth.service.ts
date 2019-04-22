import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Model } from 'mongoose';
import { User } from '../users/interfaces/User.interface';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	async validUserByPassword(loginAttempt: LoginUserDto) {
		const userToAttempt: Model<User> = await this.usersService.findOneByEmail(loginAttempt.email);

		if (!userToAttempt)
			throw new UnauthorizedException();

		return new Promise((resolve) => {
			const isValidPasswd = userToAttempt.validPassword(loginAttempt.password);

			if (isValidPasswd)
				resolve(this.createJwtPayload(userToAttempt));
			else
				throw new UnauthorizedException();
		})
	}

	async validateUserByJwt(payload: JwtPayload) {
		console.log('calloing my service');
		const user: Model<User> = await this.usersService.findOneByEmail(payload.email);

		if (user)
			return this.createJwtPayload(user);
		else
			throw new UnauthorizedException();
	}

	createJwtPayload(user) {

        let data: JwtPayload = {
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt            
    	}

    }	
}
