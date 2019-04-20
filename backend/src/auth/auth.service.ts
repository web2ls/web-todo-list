import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from '../users/schemas/User.schema';
import { User } from '../users/interfaces/User.interface';

@Injectable()
export class AuthService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	async signUp(payload) {
		// const createdUser = new this.userModel({email: payload.email});
		// createdUser.setPassword(payload.password);
		// const newUser = await createdUser.save();
		// return createdUser.generateJwt();
		// return await this.jwtService.sign(user);
	}
}
