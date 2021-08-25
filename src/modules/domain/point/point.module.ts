import { Module } from '@nestjs/common'

import { PointRepository } from './point.repository'
import { PointService } from './point.service'

@Module({
	providers: [PointService, PointRepository],
	exports: [PointService, PointRepository],
})
export class PointModule {}
