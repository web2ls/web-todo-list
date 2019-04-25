import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';


@Injectable()
export class UsersService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const createdUser = new this.userModel(createUserDto);
		createdUser.setPassword(createUserDto.password);
		return await createdUser.save();
	}

	async findOneByEmail(email): Promise<User> {
		return await this.userModel.findOne({email: email});
	}

	async findAll(): Promise<User[]> {
		return await this.userModel.find().exec();
	}
}
