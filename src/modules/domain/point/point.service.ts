import { Injectable } from '@nestjs/common'

@Injectable()
export class PointService {
	async add({ userId, amount }: { userId: string; amount: number }) {}
}
