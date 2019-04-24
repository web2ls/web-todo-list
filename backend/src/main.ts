import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

require('dotenv').config({encoding: 'utf8'});

async function bootstrap() {
  	const app = await NestFactory.create<NestExpressApplication>(AppModule);


	app.enableCors();
	app.useStaticAssets(join(__dirname, 'public', 'frontend'));


	await app.listen(process.env.PORT);
}

bootstrap();
