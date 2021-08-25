import { Test, TestingModule } from '@nestjs/testing'

import { getRepository, Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { defaultModulesForTest } from '../../../../test/lib'
import { PointTransaction } from '../../../typeorm/entities'
import { PointModule, PointService } from '../point'
import { ReviewRepository } from './review.repository'
import { ReviewService } from './review.service'

describe('ReviewService', () => {
	let service: ReviewService
	let pointService: PointService
	let pointTransactionRepository: Repository<PointTransaction>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [...defaultModulesForTest, PointModule],
			providers: [ReviewService, ReviewRepository],
		}).compile()

		service = module.get<ReviewService>(ReviewService)
		pointService = module.get<PointService>(PointService)
		pointTransactionRepository = getRepository(PointTransaction)
	})

	it('이미 리뷰를 작성한 경우 작성 불가', async () => {
		const userId = uuid()
		const reviewId = uuid()
		const placeId = uuid()
		const content = ''
		const attachedPhotoIds: string[] = []
		await service.create({
			reviewId,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		})

		let error: Error | null = null
		try {
			await service.create({
				reviewId,
				userId,
				placeId,
				content,
				attachedPhotoIds,
			})
		} catch (e) {
			error = e
		}
		expect(error).not.toBeNull()
	})

	it('포인트 3점 리뷰 생성', async () => {
		const userId = uuid()
		const reviewId = uuid()
		const placeId = uuid()
		const content = 'test'
		const attachedPhotoIds: string[] = ['imageId1']
		await service.create({
			reviewId,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		})

		const userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(3)
	})

	it('포인트 0점 리뷰 생성', async () => {
		const userId = uuid()
		const reviewId = uuid()
		const placeId = uuid()
		const content = ''
		const attachedPhotoIds: string[] = []
		// place의 첫 리뷰 점수 제거를 위해 2번 생성
		await service.create({
			reviewId: uuid(),
			userId: uuid(),
			placeId,
			content,
			attachedPhotoIds,
		})
		await service.create({
			reviewId,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		})

		const userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(0)
	})

	it('리뷰 수정 - 점수 차감 케이스', async () => {
		const userId = uuid()
		const reviewId = uuid()
		const placeId = uuid()
		const content = 'test'
		const attachedPhotoIds: string[] = ['imageId1']
		await service.create({
			reviewId,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		})
		await service.update({
			reviewId,
			userId,
			placeId,
			content: '',
			attachedPhotoIds: [],
		})

		const userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(1)
	})

	it('리뷰 삭제 시 점수 초기화', async () => {
		const userId = uuid()
		const reviewId = uuid()
		const placeId = uuid()
		const content = ''
		const attachedPhotoIds: string[] = []
		await service.create({
			reviewId,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		})
		await service.delete({
			reviewId,
			userId,
			placeId,
		})

		const userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(0)
	})

	it('place에 리뷰가 생성-삭제-생성 된 경우 보너스 점수 부여', async () => {
		const firstUserId = uuid()
		const userId = uuid()
		const firstReviewId = uuid()
		const reviewId = uuid()
		const placeId = uuid()
		const content = ''
		const attachedPhotoIds: string[] = []
		await service.create({
			reviewId: firstReviewId,
			userId: firstUserId,
			placeId,
			content,
			attachedPhotoIds,
		})
		await service.delete({
			reviewId: firstReviewId,
			userId: firstUserId,
			placeId,
		})
		await service.create({
			reviewId,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		})

		const userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(1)
	})
})
