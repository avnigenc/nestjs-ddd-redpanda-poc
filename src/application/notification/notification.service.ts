import { Inject, Injectable, Logger, type OnModuleInit } from '@nestjs/common';

import type { Credit } from '../../domain/credit/credit.model';
import {
	CREDIT_CREATED_CONSUMER_TOKEN,
	CREDIT_DELETED_CONSUMER_TOKEN,
	type EventBusConsumerRepository,
} from '../../domain/event-bus.repository';

@Injectable()
export class NotificationService implements OnModuleInit {
	private readonly logger = new Logger(NotificationService.name);

	constructor(
		@Inject(CREDIT_CREATED_CONSUMER_TOKEN)
		private readonly creditCreatedConsumer: EventBusConsumerRepository,

		@Inject(CREDIT_DELETED_CONSUMER_TOKEN)
		private readonly creditDeletedConsumer: EventBusConsumerRepository,
	) {}

	onModuleInit() {
		this.onCreditCreated_SendInformationSMS();
		this.onCreditDeleted_SendInformationSMS();
	}

	onCreditCreated_SendInformationSMS() {
		this.creditCreatedConsumer.consume(async (credit: Credit) => {
			const timestamp = new Date().toISOString();
			this.logger.debug(`[${timestamp}] Credit created event received for credit ID '${credit.id}'`);
			this.logger.debug(`[${timestamp}] Preparing to send information SMS to user for credit ID '${credit.id}'`);

			this.logger.debug(
				`[${timestamp}] Sending SMS to user ID '${crypto.randomUUID()}' with phone number '5555555555' for credit ID '${credit.id}'`,
			);

			await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

			this.logger.log(`[${timestamp}] Information SMS sent successfully for credit ID '${credit.id}'`);
		});
	}

	onCreditDeleted_SendInformationSMS() {
		this.creditDeletedConsumer.consume(async (credit: Credit) => {
			const timestamp = new Date().toISOString();
			this.logger.debug(`[${timestamp}] Credit deleted event received for credit ID '${credit.id}'`);
			this.logger.debug(`[${timestamp}] Preparing to send information SMS to user for credit ID '${credit.id}'`);

			await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

			this.logger.debug(
				`[${timestamp}] Sending SMS to user ID '${crypto.randomUUID()}' with phone number '5555555555' for credit ID '${credit.id}'`,
			);

			this.logger.log(`[${timestamp}] Information SMS sent successfully for credit ID '${credit.id}'`);
		});
	}
}
