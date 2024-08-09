import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';

import { Type } from 'class-transformer';
import { CreditStatus } from '../../domain/credit/credit-status.enum';
// biome-ignore lint/style/useImportType: <explanation>
import { CreditService } from './credit.service';

export class CreateCreditDto {
	@ApiProperty({
		type: Number,
		example: 15.12,
	})
	@IsNumber()
	baseAmount: number;
}

export class DeleteCreditDto {
	@ApiProperty({
		type: String,
		format: 'uuid',
		example: 'c142b19d-5d8c-4620-869c-3248bf739d89',
	})
	@IsUUID()
	id: string;
}

export class GetCreditDto {
	@ApiProperty({
		type: String,
		format: 'uuid',
		example: 'c142b19d-5d8c-4620-869c-3248bf739d89',
	})
	@IsUUID()
	id: string;
}

export class CreditDto {
	@ApiProperty({
		type: String,
		format: 'uuid',
	})
	id?: string;

	@ApiProperty({
		type: 'enum',
		enum: CreditStatus,
		example: CreditStatus.Unpaid,
	})
	status: number;

	@ApiProperty({
		type: 'decimal',
		example: 15.01,
	})
	baseAmount: number;

	@ApiProperty({
		type: 'date',
		example: new Date(),
	})
	createdAt: Date;

	@ApiProperty({
		type: 'date',
		example: new Date(),
	})
	updatedAt: Date;

	@ApiProperty({
		type: 'date',
		example: new Date(),
		nullable: true,
	})
	deletedAt: Date;
}

export class CustomPageableDto {
	@ApiPropertyOptional({
		minimum: 1,
		default: 1,
	})
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@IsOptional()
	readonly page?: number = 1;

	@ApiPropertyOptional({
		minimum: 1,
		maximum: 50,
		default: 10,
	})
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(50)
	@IsOptional()
	readonly limit?: number = 10;
}

export class CreditFilterCriteriaDto {
	@ApiPropertyOptional({
		type: 'enum',
		enum: CreditStatus,
		example: CreditStatus.Unpaid,
	})
	@IsEnum(CreditStatus)
	@IsOptional()
	status: CreditStatus;
}

@ApiTags('Credit')
@Controller('credits')
export class CreditController {
	constructor(private readonly creditService: CreditService) {}

	@Get()
	async all(
		@Query() filterCriteria: CreditFilterCriteriaDto,
		@Query() customPageableDto: CustomPageableDto,
	): Promise<CreditDto[]> {
		const result = await this.creditService.all(filterCriteria, customPageableDto);

		return result;
	}

	@Post()
	async create(@Body() dto: CreateCreditDto): Promise<CreditDto> {
		const result = await this.creditService.create(dto.baseAmount);

		return result;
	}

	@Delete(':id')
	async delete(@Param() dto: DeleteCreditDto): Promise<CreditDto> {
		const result = await this.creditService.delete(dto.id);

		return result;
	}

	@Get(':id')
	async get(@Param() dto: GetCreditDto): Promise<CreditDto> {
		const result = await this.creditService.get(dto.id);

		return result;
	}
}
