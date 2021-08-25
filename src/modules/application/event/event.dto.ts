import { IsOptional, IsString, IsUUID } from 'class-validator'

export enum EventTypeEnum {
	REVIEW = 'REVIEW',
}
export type EventType = keyof typeof EventTypeEnum

export enum ActionTypeEnum {
	ADD = 'ADD',
	MOD = 'MOD',
	DELETE = 'DELETE',
}
export type ActionType = keyof typeof ActionTypeEnum

export class EventDto {
	@IsString()
	type!: EventType

	@IsString()
	action!: ActionType

	@IsUUID()
	reviewId!: string

	@IsUUID()
	userId!: string

	@IsUUID()
	placeId!: string

	@IsOptional()
	@IsString()
	content?: string

	@IsString({ each: true })
	attachedPhotoIds!: string[]
}
