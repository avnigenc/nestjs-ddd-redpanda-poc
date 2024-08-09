export const RED_PANDA_PRODUCER_TOKEN = 'RED_PANDA_PRODUCER_TOKEN';

export const CREDIT_CREATED_CONSUMER_TOKEN = 'CREDIT_CREATED_CONSUMER_TOKEN';
export const CREDIT_DELETED_CONSUMER_TOKEN = 'CREDIT_DELETED_CONSUMER_TOKEN';
export const CREDIT_PAID_CONSUMER_TOKEN = 'CREDIT_PAID_CONSUMER_TOKEN';
export const CALCULATE_CASHBACK_CONSUMER_TOKEN = 'CALCULATE_CASHBACK_CONSUMER_TOKEN';

export interface EventBusProducerRepository {
	produce<T>(topic: string, key: string, msg: T): Promise<void>;
}

export interface EventBusConsumerRepository {
	consume<T>(callback: (message: T) => void): Promise<void>;
}
