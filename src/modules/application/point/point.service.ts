import { Injectable } from '@nestjs/common'

import { PointService } from '@modules/domain'

import { AddPointDto, GetPointDto } from './point.dto'

@Injectable()
export class PointApplicationService {
	constructor(private readonly pointService: PointService) {}

	async getPoint(getPointDto: GetPointDto): Promise<number> {
		return await this.pointService.getUserPoint(getPointDto.userId)
	}

	async addPoint(addPointDto: AddPointDto) {
		return await this.pointService.add({
			eventType: 'DIRECT',
			userId: addPointDto.userId,
			amount: addPointDto.amount,
		})
	}
}
