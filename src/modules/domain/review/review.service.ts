import { Injectable } from '@nestjs/common'

import { PointService } from '@modules/domain'

import { Review } from '../../../typeorm/entities'
import { CreateReviewDto, DeleteReviewDto, UpdateReviewDto } from './review.dto'
import { ReviewRepository } from './review.repository'

@Injectable()
export class ReviewService {
	constructor(
		private readonly reviewRepository: ReviewRepository,
		private readonly pointService: PointService,
	) {}

	async create(createReviewDto: CreateReviewDto) {
		// 이미 해당 장소의 리뷰를 작성한 경우
		if (await this.checkReviewExist(createReviewDto)) {
			// TODO: 에러 정리
			throw new Error('한 장소에는 한 리뷰만 작성할 수 있어요')
		}

		// 포인트 계산
		const pointAmount = await this.calculatePointAmountAtCreated(
			createReviewDto,
		)

		// 리뷰 생성
		await this.reviewRepository.create({
			id: createReviewDto.reviewId,
			userId: createReviewDto.userId,
			placeId: createReviewDto.placeId,
			content: createReviewDto.content || '',
			attachedPhotoIds: createReviewDto.attachedPhotoIds,
		})

		// 포인트 추가
		await this.pointService.add({
			eventType: 'REVIEW',
			resourceId: createReviewDto.reviewId,
			userId: createReviewDto.userId,
			amount: pointAmount,
		})
	}

	async update(updateReviewDto: UpdateReviewDto) {
		const existReview = await this.reviewRepository.findOne({
			id: updateReviewDto.reviewId,
			userId: updateReviewDto.userId,
			placeId: updateReviewDto.placeId,
		})
		// TODO: 에러 정리
		if (!existReview) throw new Error('404')

		// 포인트 계산
		const pointAmount = await this.calculatePointAmountAtUpdated(
			existReview,
			updateReviewDto,
		)

		// 리뷰 수정
		existReview.content = updateReviewDto.content || ''
		existReview.attachedPhotoIds = updateReviewDto.attachedPhotoIds
		await this.reviewRepository.save(existReview)

		// 포인트 추가
		await this.pointService.add({
			eventType: 'REVIEW',
			resourceId: updateReviewDto.reviewId,
			userId: updateReviewDto.userId,
			amount: pointAmount,
		})
	}

	async delete(deleteReviewDto: DeleteReviewDto) {
		const existReview = await this.reviewRepository.findOne({
			id: deleteReviewDto.reviewId,
			userId: deleteReviewDto.userId,
			placeId: deleteReviewDto.placeId,
		})
		// TODO: 에러 정리
		if (!existReview) throw new Error('404')

		// review 삭제
		await this.reviewRepository.delete(deleteReviewDto.reviewId)

		// 포인트 계산
		const pointAmount = await this.calculatePointAmountAtDeleted(
			deleteReviewDto,
		)
		// 포인트 추가
		await this.pointService.add({
			eventType: 'REVIEW',
			resourceId: deleteReviewDto.reviewId,
			userId: deleteReviewDto.userId,
			amount: pointAmount,
		})
	}

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

	async calculatePointAmountAtUpdated(
		existReview: Review,
		updateReviewDto: UpdateReviewDto,
	): Promise<number> {
		let pointAmount = 0
		// 글자 수 0자 -> 1자 이상 +1
		if (!existReview.content.length && updateReviewDto.content?.length)
			pointAmount += 1
		// 글자 수 1자 이상 -> 0자 -1
		if (existReview.content.length && !updateReviewDto.content?.length)
			pointAmount -= 1
		// 이미지 0개 -> 1개 이상 +1
		if (
			!existReview.attachedPhotoIds.length &&
			updateReviewDto.attachedPhotoIds.length
		)
			pointAmount += 1
		// 이미지 1개 이상 -> 0개 -1
		if (
			existReview.attachedPhotoIds.length &&
			!updateReviewDto.attachedPhotoIds.length
		)
			pointAmount -= 1
		return pointAmount
	}

	async calculatePointAmountAtDeleted(
		deleteReviewDto: DeleteReviewDto,
	): Promise<number> {
		const pointAmount = await this.pointService.sumPointAffectedByReview({
			reviewId: deleteReviewDto.reviewId,
		})
		// 이 리뷰에 영향을 받은 점수만큼 제거
		return -pointAmount
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
