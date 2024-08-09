import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { configuration, validate } from './config';

import { CashbackModule } from './application/cashback/cashback.module';
import { CreditModule } from './application/credit/credit.module';
import { NotificationModule } from './application/notification/notification.module';
import { PaymentModule } from './application/payment/payment.module';
import { MysqlModule } from './infra/mysql/mysql.module';
import { RedPandaModule } from './infra/redpanda/redpanda.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [configuration], validate }),
		MysqlModule,
		RedPandaModule,
		CreditModule,
		NotificationModule,
		CashbackModule,
		PaymentModule,
	],
	providers: [
		{
			provide: APP_PIPE,
			useFactory: (): ValidationPipe =>
				new ValidationPipe({
					transform: true,
					transformOptions: { enableImplicitConversion: true },
					validateCustomDecorators: true,
				}),
		},
	],
})
export class AppModule {}
