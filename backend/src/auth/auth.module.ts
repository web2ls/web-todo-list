import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

require('dotenv').config({encoding: 'utf8'});

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema:  UserSchema}]),
		PassportModule.register({ defaultStrategy: 'jwt', session: false }),
		JwtModule.register({
      		secretOrPrivateKey: process.env.SECRET_KEY,
			signOptions: {
				expiresIn: 3600
			}
    	}),
    	UsersModule
	],
  	providers: [AuthService, JwtStrategy],
  	controllers: [AuthController]
})
export class AuthModule {}
