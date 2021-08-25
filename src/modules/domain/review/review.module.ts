import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Review } from '../../../typeorm/entities'
import { PointModule } from '../point'
import { ReviewService } from './review.service'

@Module({
	imports: [PointModule, TypeOrmModule.forFeature([Review])],
	providers: [ReviewService],
	exports: [ReviewService],
})
export class ReviewModule {}
