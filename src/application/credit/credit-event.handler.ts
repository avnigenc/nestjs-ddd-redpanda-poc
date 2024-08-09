import { ConflictException, Inject, Injectable, Logger, type OnModuleInit } from '@nestjs/common';

import type { Credit } from '../../domain/credit/credit.model';
import { CREDIT_PAID_CONSUMER_TOKEN, type EventBusConsumerRepository } from '../../domain/event-bus.repository';
// biome-ignore lint/style/useImportType: <explanation>
import { CreditService } from './credit.service';

@Injectable()
export class CreditEventHandler implements OnModuleInit {
	private readonly logger = new Logger(CreditEventHandler.name);

	constructor(
		@Inject(CREDIT_PAID_CONSUMER_TOKEN)
		private readonly consumer: EventBusConsumerRepository,

		private readonly creditService: CreditService,
	) {}

	onModuleInit() {
		this.onCreditPaid_MakePaid();
	}

	onCreditPaid_MakePaid() {
		this.consumer.consume(async (c: Credit) => {
			const timestamp = new Date().toISOString();
			this.logger.debug(`[${timestamp}] credit.paid consumer started for credit ID '${c.id}'`);

			const credit = await this.creditService.get(c.id);
			this.logger.debug(`[${timestamp}] Retrieved credit with ID '${credit.id}', status: '${credit.status}'`);

			if (credit.isPaid()) {
				this.logger.error(`[${timestamp}] Credit with ID '${credit.id}' is already marked as paid`);

				throw new ConflictException(`Credit with ID '${credit.id}' already paid`);
			}

			try {
				credit.makePaid();
				await this.creditService.update(credit);

				this.logger.log(`[${timestamp}] Credit with ID '${credit.id}' successfully marked as paid`);
			} catch (error: unknown) {
				this.logger.error(
					`[${timestamp}] Failed to mark credit ID '${credit.id}' as paid: ${(error as Error).message}`,
				);

				throw error;
			}

			this.logger.debug(`[${timestamp}] credit.paid consumer finished processing for credit ID '${credit.id}'`);
		});
	}
}
