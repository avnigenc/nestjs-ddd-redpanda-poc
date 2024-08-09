import { Credit } from '../../../domain/credit/credit.model';
import { CreditEntity } from '../entity/credit.entity';

export class CreditMapper {
	static toEntity(credit: Credit): CreditEntity {
		const entity = new CreditEntity();
		entity.id = credit?.id;
		entity.baseAmount = credit.baseAmount;
		entity.status = credit.status;

		return entity;
	}

	static toModel(entity: CreditEntity): Credit {
		return Credit.create({
			id: entity.id,
			baseAmount: entity.baseAmount,
			status: entity.status,
			createdAt: new Date(entity.createdAt),
			updatedAt: new Date(entity.updatedAt),
			deletedAt: entity.deletedAt && new Date(entity.deletedAt),
		});
	}
}
