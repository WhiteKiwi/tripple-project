import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { EventDto } from './event.dto'
import { EventApplicationService } from './event.service'

@ApiTags('Event')
@Controller('events')
export class EventController {
	constructor(
		private readonly eventApplicationService: EventApplicationService,
	) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post()
	async handleEvent(@Body() eventDto: EventDto) {
		await this.eventApplicationService.handleEvent(eventDto)
	}
}
