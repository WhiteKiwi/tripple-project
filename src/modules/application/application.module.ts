import { Module } from '@nestjs/common'

import { EventApplicationModule } from './event/event.module'
import { PointApplicationModule } from './point/point.module'

@Module({
	imports: [EventApplicationModule, PointApplicationModule],
})
export class ApplicationModule {}
