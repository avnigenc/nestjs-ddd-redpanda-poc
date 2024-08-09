import type { FindOptionsWhere } from 'typeorm';
import type { CreditFilterCriteria } from '../../../domain/credit/credit-filter.criteria';
import type { CreditEntity } from '../entity/credit.entity';

export class CreditFilterSpecification {
	static byCriteria(criteria: CreditFilterCriteria): FindOptionsWhere<CreditEntity> {
		const where: FindOptionsWhere<CreditEntity> = {};

		if (criteria.status !== undefined) {
			Object.assign(where, { status: criteria.status });
		}

		return where;
	}
}
