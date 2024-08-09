import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default (app: INestApplication): void => {
	const swaggerBuilder = new DocumentBuilder().setTitle('Credit API - RedPanda POC').setVersion('0.0.1').build();

	const document = SwaggerModule.createDocument(app, swaggerBuilder);

	SwaggerModule.setup('api-docs', app, document, {
		explorer: false,
		customSiteTitle: 'description',
		swaggerOptions: {
			persistAuthorization: true,
			defaultModelsExpandDepth: -1,
			operationsSorter: 'alpha',
		},
	});
};
