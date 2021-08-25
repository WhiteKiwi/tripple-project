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

	@IsOptional()
	@IsUUID()
	userId!: string

	@IsOptional()
	@IsUUID()
	placeId!: string

	@IsOptional()
	@IsString()
	content?: string

	@IsOptional()
	@IsString({ each: true })
	attachedPhotoIds!: string[]
}
