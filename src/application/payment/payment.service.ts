import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { type EventBusProducerRepository, RED_PANDA_PRODUCER_TOKEN } from '../../domain/event-bus.repository';
import { Payment } from '../../domain/payment/payment.model';
import { PAYMENT_REPOSITORY_TOKEN, type PaymentRepository } from '../../domain/payment/payment.repository';
// biome-ignore lint/style/useImportType: <explanation>
import { CreditService } from '../credit/credit.service';

@Injectable()
export class PaymentService {
	constructor(
		private readonly creditService: CreditService,
		@Inject(PAYMENT_REPOSITORY_TOKEN)
		private readonly paymentRepository: PaymentRepository,
		@Inject(RED_PANDA_PRODUCER_TOKEN)
		private readonly producerRepository: EventBusProducerRepository,
	) {}

	async pay(creditId: string): Promise<boolean> {
		const credit = await this.creditService.get(creditId);

		if (credit.isPaid()) {
			throw new ConflictException(`Credit with id '${credit.id}' already paid`);
		}

		const model = Payment.create({ creditId });

		await this.paymentRepository.save(model);

		await this.producerRepository.produce('credit.paid', credit.id, credit);

		return true;
	}
}
