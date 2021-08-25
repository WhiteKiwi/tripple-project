import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Review } from 'src/typeorm/entities'
import { Repository } from 'typeorm'

import { PointService } from '../point'
import { CreateReviewDto, DeleteReviewDto, UpdateReviewDto } from './review.dto'

@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(Review)
		private readonly reviewRepository: Repository<Review>,
		private readonly pointService: PointService,
	) {}

	async create(createReviewDto: CreateReviewDto) {
		// 이미 해당 장소의 리뷰를 작성한 경우
		if (await this.checkReviewExist(createReviewDto)) {
			// TODO: 에러 정리
			throw new Error('한 장소에는 한 리뷰만 작성할 수 있어요')
		}

		// 포인트 계산
		const addedAmount = await this.calculatePointAmountAtCreated(
			createReviewDto,
		)

		// 리뷰 생성
		await this.reviewRepository.save({
			id: createReviewDto.reviewId,
			userId: createReviewDto.userId,
			placeId: createReviewDto.placeId,
			content: createReviewDto.content || '',
			attachedPhotoIds: createReviewDto.attachedPhotoIds,
		})

		// 포인트 추가
		await this.pointService.add({
			userId: createReviewDto.userId,
			amount: addedAmount,
		})
	}

	async update(updateReviewDto: UpdateReviewDto) {}

	async delete(deleteReviewDto: DeleteReviewDto) {}

	async checkReviewExist({
		userId,
		placeId,
	}: {
		userId: string
		placeId: string
	}): Promise<boolean> {
		const review = await this.reviewRepository.findOne({ userId, placeId })
		if (!review) return false
		return true
	}

	async calculatePointAmountAtCreated(
		createReviewDto: CreateReviewDto,
	): Promise<number> {
		let pointAmount = 0
		// 1자 이상 작성 시 +1
		if (createReviewDto.content?.length) pointAmount += 1
		// 이미지 1개 이상 추가 시 +1
		if (createReviewDto.attachedPhotoIds.length) pointAmount += 1
		// 그 장소의 첫 리뷰일 경우 +1
		if (
			await this.nonExistReviewAtThisPlace({ placeId: createReviewDto.placeId })
		)
			pointAmount += 1
		return pointAmount
	}

	async nonExistReviewAtThisPlace({
		placeId,
	}: {
		placeId: string
	}): Promise<boolean> {
		const review = await this.reviewRepository.findOne({ placeId })
		return !review
	}
}
