export interface PaymentArg {
	id?: string;

	creditId: string;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class Payment {
	id?: string;

	creditId: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;

	private constructor(args: PaymentArg) {
		this.id = args.id;
		this.creditId = args.creditId;
		this.createdAt = args.createdAt;
		this.updatedAt = args.updatedAt;
		this.deletedAt = args.deletedAt;
	}

	static create(args: PaymentArg) {
		return new Payment(args);
	}
}
