export class CreateReviewDto {
	reviewId!: string
	userId!: string
	placeId!: string
	content?: string
	attachedPhotoIds: string[] = []
}

export class UpdateReviewDto {
	reviewId!: string
	userId!: string
	placeId!: string
	content?: string
	attachedPhotoIds!: string[]
}

export class DeleteReviewDto {
	reviewId!: string
	userId!: string
	placeId!: string
}
