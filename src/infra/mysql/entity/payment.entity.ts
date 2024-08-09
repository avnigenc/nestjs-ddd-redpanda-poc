import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('payments')
export class PaymentEntity {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ nullable: false })
	creditId: string;

	@CreateDateColumn()
	createdAt: number;

	@UpdateDateColumn()
	updatedAt: number;

	@DeleteDateColumn()
	deletedAt: number;
}
