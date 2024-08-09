import { Module } from '@nestjs/common';

import { CreditEventHandler } from './credit-event.handler';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';

@Module({
	controllers: [CreditController],
	providers: [CreditService, CreditEventHandler],
	exports: [CreditService],
})
export class CreditModule {}
