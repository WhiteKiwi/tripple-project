import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'

import { Connection, Repository } from 'typeorm'

import {
	PointTransaction,
	PointTransactionEventType,
	ReviewPointTransaction,
} from '../../../typeorm/entities'

@Injectable()
export class PointRepository {
	private readonly pointTransactionRepository: Repository<PointTransaction>

	constructor(@InjectConnection() connection: Connection) {
		this.pointTransactionRepository = connection.getRepository(PointTransaction)
	}

	async add({
		eventType,
		resourceId,
		userId,
		amount,
	}: {
		eventType: PointTransactionEventType
		resourceId: string
		userId: string
		amount: number
	}) {
		await this.pointTransactionRepository.insert({
			eventType,
			resourceId,
			userId,
			amount,
		})
	}

	// TODO: repository로 분리
	async findTransactionsByReviewId({
		reviewId,
	}: {
		reviewId: string
	}): Promise<ReviewPointTransaction[]> {
		return []
	}
}
