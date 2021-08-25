import { Module } from '@nestjs/common'

import { ReviewModule } from '@modules/domain'

import { EventController } from './event.controller'
import { EventService } from './event.service'

@Module({
	imports: [ReviewModule],
	controllers: [EventController],
	providers: [EventService],
})
export class EventModule {}
