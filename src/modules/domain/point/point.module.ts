import { Module } from '@nestjs/common'

import { PointService } from './point.service'

@Module({
	providers: [PointService],
	exports: [PointService],
})
export class PointModule {}
