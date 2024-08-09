import { Global, Module } from '@nestjs/common';

import {
	CALCULATE_CASHBACK_CONSUMER_TOKEN,
	CREDIT_CREATED_CONSUMER_TOKEN,
	CREDIT_DELETED_CONSUMER_TOKEN,
	CREDIT_PAID_CONSUMER_TOKEN,
	RED_PANDA_PRODUCER_TOKEN,
} from '../../domain/event-bus.repository';
import { RedPandaConsumerImplRepository } from './repository/redpanda-consumer-impl.repository';
import { RedPandaProducerImplRepository } from './repository/redpanda-producer-impl.repository';

@Global()
@Module({
	providers: [
		{
			provide: RED_PANDA_PRODUCER_TOKEN,
			useClass: RedPandaProducerImplRepository,
		},

		{
			provide: CREDIT_CREATED_CONSUMER_TOKEN,
			useFactory: () => new RedPandaConsumerImplRepository('credit.created', 'make-created'),
		},
		{
			provide: CREDIT_DELETED_CONSUMER_TOKEN,
			useFactory: () => new RedPandaConsumerImplRepository('credit.deleted', 'make-deleted'),
		},
		{
			provide: CREDIT_PAID_CONSUMER_TOKEN,
			useFactory: () => new RedPandaConsumerImplRepository('credit.paid', 'make-paid'),
		},
		{
			provide: CALCULATE_CASHBACK_CONSUMER_TOKEN,
			useFactory: () => new RedPandaConsumerImplRepository('credit.paid', 'calculate-cashback'),
		},
	],
	exports: [
		RED_PANDA_PRODUCER_TOKEN,

		CREDIT_CREATED_CONSUMER_TOKEN,
		CREDIT_DELETED_CONSUMER_TOKEN,
		CREDIT_PAID_CONSUMER_TOKEN,
		CALCULATE_CASHBACK_CONSUMER_TOKEN,
	],
})
export class RedPandaModule {}
