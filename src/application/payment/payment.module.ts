import { Module } from '@nestjs/common';

import { CreditModule } from '../credit/credit.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
	imports: [CreditModule],
	controllers: [PaymentController],
	providers: [PaymentService],
})
export class PaymentModule {}
