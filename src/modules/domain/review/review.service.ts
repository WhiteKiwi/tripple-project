import { Injectable } from '@nestjs/common'

import { CreateReviewDto, DeleteReviewDto, UpdateReviewDto } from './review.dto'

@Injectable()
export class ReviewService {
	async create(createReviewDto: CreateReviewDto) {}
	async update(updateReviewDto: UpdateReviewDto) {}
	async delete(deleteReviewDto: DeleteReviewDto) {}
}
