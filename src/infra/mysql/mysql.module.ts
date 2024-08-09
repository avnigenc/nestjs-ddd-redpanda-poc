import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import type { AppConfig, DatabaseConfig } from '../../config';
import { CREDIT_REPOSITORY_TOKEN } from '../../domain/credit/credit.repository';
import { PAYMENT_REPOSITORY_TOKEN } from '../../domain/payment/payment.repository';
import { CreditEntity } from './entity/credit.entity';
import { PaymentEntity } from './entity/payment.entity';
import { dataSource } from './mysql.config';
import { CreditImplRepository } from './repository/credit-impl.repository';
import { PaymentImplRepository } from './repository/payment-impl.repository';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService<AppConfig>) => {
				await dataSource.initialize();

				const config = configService.getOrThrow<DatabaseConfig>('DATABASE');

				return {
					type: 'mysql',
					host: config.HOST,
					port: 3306,
					username: config.USERNAME,
					password: config.PASSWORD,
					database: config.NAME,
					entities: [CreditEntity, PaymentEntity],
					synchronize: true,
				};
			},
		}),
		TypeOrmModule.forFeature([CreditEntity, PaymentEntity]),
	],
	providers: [
		{
			provide: CREDIT_REPOSITORY_TOKEN,
			useClass: CreditImplRepository,
		},
		{
			provide: PAYMENT_REPOSITORY_TOKEN,
			useClass: PaymentImplRepository,
		},
	],
	exports: [CREDIT_REPOSITORY_TOKEN, PAYMENT_REPOSITORY_TOKEN],
})
export class MysqlModule {}
