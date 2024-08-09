import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import type { Payment } from '../../../domain/payment/payment.model';
import type { PaymentFindFilter, PaymentRepository } from '../../../domain/payment/payment.repository';
import { PaymentEntity } from '../entity/payment.entity';
import { PaymentMapper } from '../mapper/payment.mapper';

export class PaymentImplRepository implements PaymentRepository {
	constructor(
		@InjectRepository(PaymentEntity)
		private readonly repository: Repository<PaymentEntity>,
	) {}

	async save(payment: Payment): Promise<Payment> {
		const entity = PaymentMapper.toEntity(payment);

		const savedEntity = await this.repository.save(entity);

		return PaymentMapper.toModel(savedEntity);
	}

	async find(filter: PaymentFindFilter): Promise<Payment | null> {
		const entity = await this.repository.findOne({ where: filter });

		if (!entity) {
			return null;
		}

		return PaymentMapper.toModel(entity);
	}
}
