import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Index('user_id_place_id_unique_index', ['userId', 'placeId'], { unique: true })
@Entity({ name: 'reviews' })
export class Review {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column('uuid', { name: 'user_id' })
	userId!: string

	@Index('place_id_index')
	@Column('uuid', { name: 'place_id' })
	placeId!: string

	@Column('varchar', { length: 5000 })
	content!: string

	@Column('json', { name: 'attached_photo_ids' })
	attachedPhotoIds: string[] = []

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt!: Date
}
