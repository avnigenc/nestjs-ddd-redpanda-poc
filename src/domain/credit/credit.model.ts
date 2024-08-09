import { CreditStatus } from './credit-status.enum';

export interface CreditArg {
	id?: string;

	status: number;
	baseAmount: number;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class Credit {
	id?: string;

	status: number;
	baseAmount: number;

	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;

	private constructor(args: CreditArg) {
		this.id = args.id;
		this.status = args.status;
		this.baseAmount = args.baseAmount;
		this.createdAt = args.createdAt;
		this.updatedAt = args.updatedAt;
		this.deletedAt = args.deletedAt;
	}

	static create(args: CreditArg) {
		return new Credit(args);
	}

	makePaid() {
		this.status = CreditStatus.Paid;
	}

	isDeleted() {
		return this.status === CreditStatus.Deleted;
	}

	isUnpaid() {
		return this.status === CreditStatus.Unpaid;
	}

	isPaid() {
		return this.status === CreditStatus.Paid;
	}
}
