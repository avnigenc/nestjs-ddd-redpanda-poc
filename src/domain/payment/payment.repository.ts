import type { Payment } from './payment.model';

export const PAYMENT_REPOSITORY_TOKEN = 'payment-repository-token';

export interface PaymentFindFilter {
	id: string;
}

export interface PaymentRepository {
	save(payment: Payment): Promise<Payment>;
	find(filter: PaymentFindFilter): Promise<Payment | null>;
}
