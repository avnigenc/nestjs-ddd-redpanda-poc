import { type Consumer, Kafka } from 'kafkajs';

import type { EventBusConsumerRepository } from '../../../domain/event-bus.repository';

export class RedPandaConsumerImplRepository implements EventBusConsumerRepository {
	private readonly kafka: Kafka;
	private consumer: Consumer;

	constructor(topic: string, groupId?: string) {
		this.kafka = new Kafka({
			brokers: ['localhost:19092'],
		});

		this.consumer = this.kafka.consumer({ groupId: groupId || crypto.randomUUID(), retry: { initialRetryTime: 1000 } });
		this.consumer.connect().catch(console.log);
		this.consumer.subscribe({ topic }).catch(console.log);
	}

	async consume<T>(callback: (message: T) => void): Promise<void> {
		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				const formattedValue = JSON.parse((message.value as Buffer).toString());

				callback(formattedValue);
			},
		});
	}
}
