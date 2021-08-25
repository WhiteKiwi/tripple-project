import { IsEnum, IsString, IsUUID } from 'class-validator'

import { EventType, EventTypeEnum } from '../../../typeorm/entities'

export enum ActionTypeEnum {
	ADD = 'ADD',
	MOD = 'MOD',
	DELETE = 'DELETE',
}
export type ActionType = keyof typeof ActionTypeEnum

export class EventDto {
	@IsEnum({ enum: EventTypeEnum })
	type!: EventType

	@IsEnum({ enum: ActionTypeEnum })
	action!: ActionType

	@IsUUID()
	reviewId!: string

	@IsUUID()
	userId!: string

	@IsUUID()
	placeId!: string

	@IsString()
	content!: string

	@IsString({ each: true })
	attachedPhotoIds!: string[]
}
