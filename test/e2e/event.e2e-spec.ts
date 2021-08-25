import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { EventController } from '@modules/application/event/event.controller'
import { EventDto } from '@modules/application/event/event.dto'
import { EventApplicationService } from '@modules/application/event/event.service'
import { PointService, ReviewModule } from '@modules/domain'

import supertest from 'supertest'
import { v4 as uuid } from 'uuid'

import { defaultModulesForTest } from '../lib'
import { globalAppSetup } from '../lib/global-app-setup'

describe('EventController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let pointService: PointService

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [...defaultModulesForTest, ReviewModule],
			controllers: [EventController],
			providers: [EventApplicationService],
		}).compile()

		app = moduleFixture.createNestApplication()
		globalAppSetup(app)
		await app.init()
		request = supertest(app.getHttpServer())

		pointService = moduleFixture.get<PointService>(PointService)
	})

	it('/ (POST) - add', async () => {
		const reviewId = uuid()
		const userId = uuid()
		const placeId = uuid()
		const content = ''
		const attachedPhotoIds: string[] = []
		const eventDto: EventDto = {
			type: 'REVIEW',
			action: 'ADD',
			reviewId,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		}
		const response = await request.post('/events').send(eventDto)
		expect(response.status).toBe(HttpStatus.NO_CONTENT)

		const userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(1)
	})

	it('/ (POST) - mod', async () => {
		const reviewId = uuid()
		const userId = uuid()
		const placeId = uuid()
		const content = ''
		const attachedPhotoIds: string[] = []
		const eventDto: EventDto = {
			type: 'REVIEW',
			action: 'ADD',
			reviewId,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		}
		await request.post('/events').send(eventDto)

		let userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(1)

		const modEventDto: EventDto = {
			type: 'REVIEW',
			action: 'MOD',
			reviewId,
			userId,
			placeId,
			content: 'test',
			attachedPhotoIds: ['imageIds'],
		}
		const response = await request.post('/events').send(modEventDto)
		expect(response.status).toBe(HttpStatus.NO_CONTENT)

		userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(3)
	})

	it('/ (POST) - delete', async () => {
		const reviewId = uuid()
		const userId = uuid()
		const placeId = uuid()
		const content = ''
		const attachedPhotoIds: string[] = []
		const eventDto: EventDto = {
			type: 'REVIEW',
			action: 'ADD',
			reviewId,
			userId,
			placeId,
			content,
			attachedPhotoIds,
		}
		await request.post('/events').send(eventDto)

		let userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(1)

		const modEventDto: EventDto = {
			type: 'REVIEW',
			action: 'DELETE',
			reviewId,
			userId,
			placeId,
			content: 'test',
			attachedPhotoIds: ['imageIds'],
		}
		const response = await request.post('/events').send(modEventDto)
		expect(response.status).toBe(HttpStatus.NO_CONTENT)

		userPoint = await pointService.getUserPoint(userId)
		expect(userPoint).toBe(0)
	})
})
