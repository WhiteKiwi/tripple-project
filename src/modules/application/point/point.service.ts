import { Injectable } from '@nestjs/common'

import { PointRepository, PointService } from '@modules/domain'

import { AddPointDto, GetPointDto } from './point.dto'

@Injectable()
export class PointApplicationService {
	constructor(
		private readonly pointService: PointService,
		private readonly pointRepository: PointRepository,
	) {}

	async getPoint(getPointDto: GetPointDto): Promise<number> {
		return await this.pointRepository.getUserPoint(getPointDto.userId)
	}

	async addPoint(addPointDto: AddPointDto) {
		return await this.pointService.add({
			eventType: 'DIRECT',
			userId: addPointDto.userId,
			amount: addPointDto.amount,
		})
	}
}
