import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'

import { Connection, Repository } from 'typeorm'

import { Review } from '../../../typeorm/entities'

@Injectable()
export class ReviewRepository {
	private readonly reviewRepository: Repository<Review>

	constructor(@InjectConnection() connection: Connection) {
		this.reviewRepository = connection.getRepository(Review)
	}

	async create({
		id,
		userId,
		placeId,
		content,
		attachedPhotoIds,
	}: {
		id: string
		userId: string
		placeId: string
		content: string
		attachedPhotoIds: string[]
	}) {
		await this.reviewRepository.insert({
			id,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		})
	}

	async save(review: Review) {
		await this.reviewRepository.save(review)
	}

	async findOne({
		id,
		userId,
		placeId,
	}: {
		id: string
		userId: string
		placeId: string
	}) {
		return await this.reviewRepository.findOne(id, {
			where: { userId, placeId },
		})
	}

	async findOneByPlaceId(placeId: string) {
		return await this.reviewRepository.findOne({ placeId })
	}

	async findOneByUserIdAndPlaceId({
		userId,
		placeId,
	}: {
		userId: string
		placeId: string
	}) {
		return await this.reviewRepository.findOne({ userId, placeId })
	}

	async delete(reviewId: string) {
		await this.reviewRepository.softDelete(reviewId)
	}
}
