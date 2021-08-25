import { Module } from '@nestjs/common'

import { RedisModule } from '@modules/core'

import { PointRepository } from './point.repository'
import { PointService } from './point.service'

@Module({
	imports: [RedisModule],
	providers: [PointService, PointRepository],
	exports: [PointService, PointRepository],
})
export class PointModule {}
