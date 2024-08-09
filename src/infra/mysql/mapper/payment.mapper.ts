import { Payment } from '../../../domain/payment/payment.model';
import { PaymentEntity } from '../entity/payment.entity';

export class PaymentMapper {
	static toEntity(credit: Payment): PaymentEntity {
		const entity = new PaymentEntity();
		entity.id = credit?.id;
		entity.creditId = credit.creditId;

		return entity;
	}

	static toModel(entity: PaymentEntity): Payment {
		return Payment.create({
			id: entity.id,
			creditId: entity.creditId,
			createdAt: new Date(entity.createdAt),
			updatedAt: new Date(entity.updatedAt),
			deletedAt: entity.deletedAt && new Date(entity.deletedAt),
		});
	}
}
