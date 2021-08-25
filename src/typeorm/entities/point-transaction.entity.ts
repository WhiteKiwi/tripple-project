import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
} from 'typeorm'

export enum PointTransactionEventTypeEnum {
	REVIEW = 'REVIEW',
}
export type PointTransactionEventType =
	keyof typeof PointTransactionEventTypeEnum

@Index('source_id_event_type_index', ['resourceId', 'eventType'])
@Entity({ name: 'point_transactions' })
export class PointTransaction {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column('enum', { enum: PointTransactionEventTypeEnum })
	eventType!: PointTransactionEventType

	@Column('uuid', { name: 'resource_id' })
	resourceId!: string

	@Index('user_id_index')
	@Column('uuid', { name: 'user_id' })
	userId!: string

	@Column('int', { unsigned: true })
	amount!: number

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date
}
export class ReviewPointTransaction extends PointTransaction {
	eventType = PointTransactionEventTypeEnum.REVIEW
}
