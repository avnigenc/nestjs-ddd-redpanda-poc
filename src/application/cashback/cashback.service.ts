import { Inject, Injectable, Logger, type OnModuleInit } from '@nestjs/common';

import type { Credit } from '../../domain/credit/credit.model';
import { CALCULATE_CASHBACK_CONSUMER_TOKEN, type EventBusConsumerRepository } from '../../domain/event-bus.repository';

@Injectable()
export class CashbackService implements OnModuleInit {
	private readonly logger = new Logger(CashbackService.name);

	constructor(
		@Inject(CALCULATE_CASHBACK_CONSUMER_TOKEN)
		private readonly consumer: EventBusConsumerRepository,
	) {}

	onModuleInit() {
		this.onCreditPaid_CalculateCashback();
	}

	onCreditPaid_CalculateCashback() {
		this.consumer.consume(async (credit: Credit) => {
			const timestamp = new Date().toISOString();
			this.logger.debug(`[${timestamp}] Cashback calculation started for credit ID '${credit.id}'`);

			try {
				const cashbackAmount = await this.calculateCashback(credit);
				this.logger.debug(`[${timestamp}] Cashback of '${cashbackAmount}' calculated for credit ID '${credit.id}'`);

				await this.applyCashback(credit.id, cashbackAmount);
			} catch (error: unknown) {
				this.logger.error(
					`[${timestamp}] Error calculating cashback for credit ID '${credit.id}': ${(error as Error).message}`,
				);

				throw error;
			}

			this.logger.debug(`[${timestamp}] Cashback calculation and application finished for credit ID '${credit.id}'`);
		});
	}

	async calculateCashback(credit: Credit): Promise<number> {
		const timestamp = new Date().toISOString();
		this.logger.debug(`[${timestamp}] Calculating cashback for credit ID '${credit.id}'`);
		await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
		const cashbackAmount = 10;
		this.logger.debug(`[${timestamp}] Cashback amount for credit ID '${credit.id}' is '${cashbackAmount}'`);

		return cashbackAmount;
	}

	async applyCashback(creditId: string, amount: number): Promise<void> {
		const timestamp = new Date().toISOString();
		this.logger.debug(`[${timestamp}] Applying cashback of '${amount}' to credit ID '${creditId}'`);
		await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
		this.logger.debug(`[${timestamp}] Cashback of '${amount}' applied to credit ID '${creditId}' successfully`);
	}
}
