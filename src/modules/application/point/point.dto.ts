import { IsNumber, IsUUID } from 'class-validator'

export class GetPointDto {
	@IsUUID()
	userId!: string
}

export class AddPointDto {
	@IsUUID()
	userId!: string

	@IsNumber()
	amount!: number
}
