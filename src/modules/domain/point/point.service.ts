import { Injectable } from '@nestjs/common'

import { ReviewPointTransaction } from '../../../typeorm/entities'

@Injectable()
export class PointService {
	async add({ userId, amount }: { userId: string; amount: number }) {
		// TODO: point transaction 생성
		// TODO: redis에 user point 갱신
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
