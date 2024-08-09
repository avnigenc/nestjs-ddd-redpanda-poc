import type { CustomPageable } from '../custom-pageable';
import type { CreditFilterCriteria } from './credit-filter.criteria';
import type { Credit } from './credit.model';

export const CREDIT_REPOSITORY_TOKEN = 'credit-repository-token';

export interface CreditFindFilter {
	id: string;
}

export interface CreditRepository {
	find(filter: CreditFindFilter): Promise<Credit | null>;
	all(criteria: CreditFilterCriteria, pageable: CustomPageable): Promise<Credit[]>;
	delete(credit: Credit): Promise<Credit>;
	save(credit: Credit): Promise<Credit>;
}
