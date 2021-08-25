import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { EventDto } from './event.dto'
import { EventService } from './event.service'

@ApiTags('Event')
@Controller('events')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post('events')
	async handleEvent(@Body() eventDto: EventDto) {
		await this.eventService.handleEvent(eventDto)
	}
}
