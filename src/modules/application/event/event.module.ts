import { Module } from '@nestjs/common'

import { ReviewModule } from '@modules/domain'

import { EventController } from './event.controller'
import { EventApplicationService } from './event.service'

@Module({
	imports: [ReviewModule],
	controllers: [EventController],
	providers: [EventApplicationService],
})
export class EventApplicationModule {}
