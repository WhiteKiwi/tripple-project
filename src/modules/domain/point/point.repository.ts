import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'

import { Connection, Repository } from 'typeorm'

import {
	PointTransaction,
	ReviewPointTransaction,
} from '../../../typeorm/entities'

@Injectable()
export class PointRepository {
	private readonly pointTransactionRepository: Repository<PointTransaction>

	constructor(@InjectConnection() connection: Connection) {
		this.pointTransactionRepository = connection.getRepository(PointTransaction)
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
