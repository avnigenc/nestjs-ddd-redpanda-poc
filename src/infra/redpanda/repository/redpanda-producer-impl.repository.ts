import { Kafka, type Producer } from 'kafkajs';
import type { EventBusProducerRepository } from '../../../domain/event-bus.repository';

export class RedPandaProducerImplRepository implements EventBusProducerRepository {
	private readonly kafka: Kafka;
	private readonly producer: Producer;

	constructor() {
		this.kafka = new Kafka({
			brokers: ['localhost:19092'],
		});

		this.producer = this.kafka.producer({ idempotent: true });
		this.producer.connect().catch(console.log);
	}

	async produce<T>(topic: string, key: string, msg: T): Promise<void> {
		await this.producer.send({
			topic,
			messages: [{ key, value: JSON.stringify(msg) }],
		});
	}
}
