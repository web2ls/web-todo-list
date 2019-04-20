import { Module } from '@nestjs/common';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
		PassportModule.register({ defaultStrategy: 'jwt', session: false })
	],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService]
})
export class UsersModule {}
