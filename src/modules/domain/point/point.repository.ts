import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'

import { RedisService } from '@modules/core'

import { Connection, Repository } from 'typeorm'

import {
	PointTransaction,
	PointTransactionEventType,
} from '../../../typeorm/entities'

@Injectable()
export class PointRepository {
	private readonly pointTransactionRepository: Repository<PointTransaction>

	constructor(
		@InjectConnection() connection: Connection,
		private readonly redisService: RedisService,
	) {
		this.pointTransactionRepository = connection.getRepository(PointTransaction)
	}

	private getUserPointKey(userId: string) {
		return `user:point:${userId}`
	}

	async add({
		eventType,
		resourceId,
		userId,
		amount,
	}: {
		eventType: PointTransactionEventType
		resourceId?: string
		userId: string
		amount: number
	}) {
		await this.pointTransactionRepository.insert({
			eventType,
			resourceId,
			userId,
			amount,
		})

		const userPoint = await this.getUserPoint(userId)
		const userPointKey = this.getUserPointKey(userId)
		await this.redisService.set(userPointKey, userPoint + amount)
	}

	async getUserPoint(userId: string) {
		const userPointKey = this.getUserPointKey(userId)
		let userPoint = Number(await this.redisService.get(userPointKey))
		// 캐싱된 userPoint가 존재하지 않으면 DB에서 로드
		if (isNaN(userPoint)) {
			userPoint = await this.getUserPointFromDB(userId)
		}
		return Number(userPoint)
	}

	private async getUserPointFromDB(userId: string) {
		const pointTransactions = await this.pointTransactionRepository.find({
			userId,
		})
		return pointTransactions.reduce((prev, curr) => prev + curr.amount, 0)
	}

	async findTransactionsByReviewId({
		reviewId,
	}: {
		reviewId: string
	}): Promise<PointTransaction[]> {
		return await this.pointTransactionRepository.find({
			resourceId: reviewId,
			eventType: 'REVIEW',
		})
	}
}
