import { Injectable } from '@nestjs/common'

import { PointTransactionEventType } from '../../../typeorm/entities'
import { PointRepository } from './point.repository'

@Injectable()
export class PointService {
	constructor(private readonly pointRepository: PointRepository) {}

	async add({
		eventType,
		resourceId,
		userId,
		amount,
	}: {
		eventType: PointTransactionEventType
		// TODO: resourceId가 필수인 eventType에 대한 타입 처리 안 됨
		resourceId?: string
		userId: string
		amount: number
	}) {
		await this.pointRepository.add({ eventType, resourceId, userId, amount })
	}

	async getUserPoint(userId: string) {
		return await this.pointRepository.getUserPoint(userId)
	}

	async sumPointAffectedByReview({
		reviewId,
	}: {
		reviewId: string
	}): Promise<number> {
		const pointTransactions =
			await this.pointRepository.findTransactionsByReviewId({ reviewId })
		const pointAmount = pointTransactions.reduce(
			(prev, curr) => prev + curr.amount,
			0,
		)
		return pointAmount
	}
}
