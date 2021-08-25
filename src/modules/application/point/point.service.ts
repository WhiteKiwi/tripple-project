import { Injectable } from '@nestjs/common'

import { AddPointDto, GetPointDto } from './point.dto'

@Injectable()
export class PointApplicationService {
	async getPoint(getPointDto: GetPointDto) {}
	async addPoint(addPointDto: AddPointDto) {}
}
