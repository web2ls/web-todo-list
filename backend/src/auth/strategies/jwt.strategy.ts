import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

const SECRET_KEY = process.env.SECRET_KEY || '123';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET_KEY
		});
	}

	async validate(payload: JwtPayload) {
		const checkedUser = await this.authService.validateUserByJwt(payload);

		if (!checkedUser)
			throw new UnauthorizedException();

		return checkedUser;
	}
}