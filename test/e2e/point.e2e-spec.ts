import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { PointController } from '@modules/application/point/point.controller'
import { AddPointDto, GetPointDto } from '@modules/application/point/point.dto'
import { PointApplicationService } from '@modules/application/point/point.service'
import { PointModule, PointService } from '@modules/domain'

import supertest from 'supertest'
import { v4 as uuid } from 'uuid'

import { defaultModulesForTest } from '../lib'
import { globalAppSetup } from '../lib/global-app-setup'

describe('PointController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let pointService: PointService

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [...defaultModulesForTest, PointModule],
			controllers: [PointController],
			providers: [PointApplicationService],
		}).compile()

		app = moduleFixture.createNestApplication()
		globalAppSetup(app)
		await app.init()
		request = supertest(app.getHttpServer())

		pointService = moduleFixture.get<PointService>(PointService)
	})

	it('/ (GET) ', async () => {
		const userId = uuid()
		const getPointDto: GetPointDto = {
			userId,
		}
		const response = await request.get('/points').query(getPointDto)
		expect(response.status).toBe(HttpStatus.OK)

		expect(response.body.data.point).toBe(0)
	})

	it('/ (POST)', async () => {
		const userId = uuid()
		const pointAmount = 100
		const addPointDto: AddPointDto = {
			userId,
			amount: pointAmount,
		}
		await request.post('/points').send(addPointDto)

		let userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(100)
	})
})
