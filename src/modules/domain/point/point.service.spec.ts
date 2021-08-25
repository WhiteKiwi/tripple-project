import { Test, TestingModule } from '@nestjs/testing'

import { RedisModule, RedisService } from '@modules/core'

import { v4 as uuid } from 'uuid'

import { defaultModulesForTest } from '../../../../test/lib'
import { PointRepository } from './point.repository'
import { PointService } from './point.service'

describe('PointService', () => {
	let service: PointService
	let pointRepository: PointRepository
	let redisService: RedisService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [...defaultModulesForTest, RedisModule],
			providers: [PointService, PointRepository],
		}).compile()

		service = module.get<PointService>(PointService)
		pointRepository = module.get<PointRepository>(PointRepository)
		redisService = module.get<RedisService>(RedisService)
	})

	it('Should be return point of user', async () => {
		const userId = uuid()
		const pointAmount = 1000
		await redisService.set(pointRepository.getUserPointKey(userId), pointAmount)

		const userPointAmount = await service.getUserPoint(userId)

		expect(userPointAmount).toBe(pointAmount)
	})

	it('Should add point to user', async () => {
		const userId = uuid()
		const pointAmount = 1000

		await service.add({
			eventType: 'DIRECT',
			userId,
			amount: pointAmount,
		})

		const userPointAmount = Number(
			await redisService.get(pointRepository.getUserPointKey(userId)),
		)

		expect(userPointAmount).toBe(pointAmount)
	})
})
