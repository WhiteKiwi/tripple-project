import { Module } from '@nestjs/common'

import { PointModule } from '@modules/domain'

import { PointController } from './point.controller'
import { PointApplicationService } from './point.service'

@Module({
	imports: [PointModule],
	controllers: [PointController],
	providers: [PointApplicationService],
})
export class PointApplicationModule {}
