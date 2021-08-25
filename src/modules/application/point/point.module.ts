import { Module } from '@nestjs/common'

import { PointController } from './point.controller'
import { PointApplicationService } from './point.service'

@Module({
	controllers: [PointController],
	providers: [PointApplicationService],
})
export class PointApplicationModule {}
