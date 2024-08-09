import type { CreditStatus } from './credit-status.enum';

export class CreditFilterCriteria {
	readonly status?: CreditStatus;

	constructor(private readonly _status?: CreditStatus) {
		this.status = _status;
	}
}
