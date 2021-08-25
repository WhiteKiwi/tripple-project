import { Injectable } from '@nestjs/common'

import { PointTransactionEventType } from 'src/typeorm/entities'

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
		resourceId?: string
		userId: string
		amount: number
	}) {
		await this.pointRepository.add({ eventType, resourceId, userId, amount })
	}
}
