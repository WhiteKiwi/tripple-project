import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AddPointDto, GetPointDto } from './point.dto'
import { PointApplicationService } from './point.service'

@ApiTags('Point')
@Controller('points')
export class PointController {
	constructor(
		private readonly pointApplicationService: PointApplicationService,
	) {}

	@Get()
	async getPoint(@Query() getPointDto: GetPointDto) {
		const point = await this.pointApplicationService.getPoint(getPointDto)
		return { data: { point } }
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post()
	async addPoint(@Body() addPointDto: AddPointDto) {
		await this.pointApplicationService.addPoint(addPointDto)
	}
}
