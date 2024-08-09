import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import type { CreditFilterCriteria } from '../../../domain/credit/credit-filter.criteria';
import type { Credit } from '../../../domain/credit/credit.model';
import type { CreditFindFilter, CreditRepository } from '../../../domain/credit/credit.repository';
import type { CustomPageable } from '../../../domain/custom-pageable';
import { CreditEntity } from '../entity/credit.entity';
import { CreditMapper } from '../mapper/credit.mapper';
import { CreditFilterSpecification } from '../specification/credit.specification';

export class CreditImplRepository implements CreditRepository {
	constructor(
		@InjectRepository(CreditEntity)
		private readonly repository: Repository<CreditEntity>,
	) {}

	async find(filter: CreditFindFilter): Promise<Credit | null> {
		const entity = await this.repository.findOne({ where: filter });

		if (!entity) {
			return null;
		}

		return CreditMapper.toModel(entity);
	}

	async delete(credit: Credit): Promise<Credit> {
		await this.repository.softDelete({ id: credit.id });
		await this.repository.update({ id: credit.id }, { status: 0 });

		const entity = await this.repository.findOne({ where: { id: credit.id }, withDeleted: true });

		return CreditMapper.toModel(entity);
	}

	async save(credit: Credit): Promise<Credit> {
		const entity = CreditMapper.toEntity(credit);

		const savedEntity = await this.repository.save(entity);

		return CreditMapper.toModel(savedEntity);
	}

	async all(criteria: CreditFilterCriteria, pageable: CustomPageable): Promise<Credit[]> {
		const specification = CreditFilterSpecification.byCriteria(criteria);

		const entities = await this.repository.find({
			where: specification,
			take: pageable.limit,
			skip: pageable.skip,
			order: { createdAt: 'DESC' },
		});

		return entities.map(CreditMapper.toModel);
	}
}
