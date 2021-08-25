import { Injectable } from '@nestjs/common'

import { ReviewService } from '../../domain'
import { EventDto } from './event.dto'

@Injectable()
export class EventService {
	constructor(private readonly reviewService: ReviewService) {}
	async handleEvent(eventDto: EventDto) {
		if (eventDto.action === 'ADD') {
			await this.reviewService.create({
				reviewId: eventDto.reviewId,
				userId: eventDto.userId,
				placeId: eventDto.placeId,
				content: eventDto.content,
				attachedPhotoIds: eventDto.attachedPhotoIds,
			})
			return
		}
		if (eventDto.action === 'MOD') {
			await this.reviewService.update({
				reviewId: eventDto.reviewId,
				userId: eventDto.userId,
				placeId: eventDto.placeId,
				content: eventDto.content,
				attachedPhotoIds: eventDto.attachedPhotoIds,
			})
			return
		}
		if (eventDto.action === 'DELETE') {
			await this.reviewService.delete({
				reviewId: eventDto.reviewId,
				userId: eventDto.userId,
				placeId: eventDto.placeId,
			})
			return
		}
	}
}
