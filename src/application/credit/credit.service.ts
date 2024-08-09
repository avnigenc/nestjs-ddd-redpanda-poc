import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CreditFilterCriteria } from '../../domain/credit/credit-filter.criteria';
import { CreditStatus } from '../../domain/credit/credit-status.enum';
import { Credit } from '../../domain/credit/credit.model';
// biome-ignore lint/style/useImportType: <explanation>
import { CREDIT_REPOSITORY_TOKEN, CreditRepository } from '../../domain/credit/credit.repository';
import { CustomPageable } from '../../domain/custom-pageable';
import { type EventBusProducerRepository, RED_PANDA_PRODUCER_TOKEN } from '../../domain/event-bus.repository';
import type { CreditFilterCriteriaDto, CustomPageableDto } from './credit.controller';

@Injectable()
export class CreditService {
	private readonly logger = new Logger(CreditService.name);

	constructor(
		@Inject(CREDIT_REPOSITORY_TOKEN)
		private readonly creditRepository: CreditRepository,

		@Inject(RED_PANDA_PRODUCER_TOKEN)
		private readonly producerRepository: EventBusProducerRepository,
	) {}

	async create(baseAmount: number): Promise<Credit> {
		const model = Credit.create({ baseAmount, status: CreditStatus.Unpaid });

		const credit = await this.creditRepository.save(model);

		this.producerRepository.produce<Credit>('credit.created', credit.id, credit);

		return credit;
	}

	async update(credit: Credit): Promise<Credit> {
		return this.creditRepository.save(credit);
	}

	async delete(id: string): Promise<Credit> {
		let credit = await this.get(id);

		if (credit.isDeleted()) {
			throw new ConflictException(`Credit with id '${credit.id}' already deleted`);
		}

		credit = await this.creditRepository.delete(credit);

		this.producerRepository.produce<Credit>('credit.deleted', credit.id, credit);

		return credit;
	}

	async get(id: string): Promise<Credit> {
		const credit = await this.creditRepository.find({ id });

		if (!credit) {
			throw new NotFoundException(`Credit with id '${id}' not found`);
		}

		return credit;
	}

	async all(filterCriteria: CreditFilterCriteriaDto, pageable: CustomPageableDto): Promise<Credit[]> {
		const criteria = new CreditFilterCriteria(filterCriteria.status);
		const customPageable = new CustomPageable(pageable.page, pageable.limit);

		return this.creditRepository.all(criteria, customPageable);
	}
}
