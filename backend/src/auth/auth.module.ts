import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/User.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema:  UserSchema}])
	],
  	providers: [AuthService],
  	controllers: [AuthController]
})
export class AuthModule {}
