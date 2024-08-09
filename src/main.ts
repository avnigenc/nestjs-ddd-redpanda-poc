import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import initSwagger from './bootstrap/swagger';
import type { AppConfig } from './config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	useContainer(app.select(AppModule), {
		fallback: true,
		fallbackOnErrors: true,
	});

	const configService = app.get(ConfigService<AppConfig>);

	if (configService.getOrThrow('IS_SWAGGER_ENABLED')) {
		initSwagger(app);
	}

	const port = configService.getOrThrow('PORT');

	await app.listen(port);

	Logger.log(
		`Application running at http://localhost:${port} on ${configService.getOrThrow('NODE_ENV')} mode 🚀`,
		'bootstrap',
	);
}

bootstrap().catch(console.log);
