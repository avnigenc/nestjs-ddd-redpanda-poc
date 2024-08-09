import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('credits')
export class CreditEntity {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ nullable: false })
	status: number;

	@Column({
		type: 'decimal',
		nullable: false,
		precision: 8,
		scale: 2,
	})
	baseAmount: number;

	@CreateDateColumn()
	createdAt: number;

	@UpdateDateColumn()
	updatedAt: number;

	@DeleteDateColumn()
	deletedAt: number;
}
