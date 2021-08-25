import { Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PointApplicationService } from './point.service'

@ApiTags('Point')
@Controller('points')
export class PointController {
	constructor(
		private readonly pointApplicationService: PointApplicationService,
	) {}

	@Get()
	getPoint() {}

	@Post()
	addPoint() {}
}
