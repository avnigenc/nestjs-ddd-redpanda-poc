import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

// biome-ignore lint/style/useImportType: <explanation>
import { PaymentService } from './payment.service';

export class PayCreditDto {
	@ApiProperty({
		type: String,
		format: 'uuid',
		example: 'c142b19d-5d8c-4620-869c-3248bf739d89',
	})
	@IsUUID()
	creditId: string;
}

@ApiTags('Payment')
@Controller('payments')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post()
	async pay(@Body() dto: PayCreditDto) {
		const result = await this.paymentService.pay(dto.creditId);

		return result;
	}
}
