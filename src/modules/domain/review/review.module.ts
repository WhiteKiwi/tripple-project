import { Module } from '@nestjs/common'

import { PointModule } from '../point'
import { ReviewRepository } from './review.repository'
import { ReviewService } from './review.service'

@Module({
	imports: [PointModule],
	providers: [ReviewService, ReviewRepository],
	exports: [ReviewService],
})
export class ReviewModule {}
