import { Test, TestingModule } from '@nestjs/testing'

import { defaultModulesForTest } from '../../../../test/lib'
import { PointService } from './point.service'

describe('PointService', () => {
	let service: PointService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [...defaultModulesForTest],
			providers: [PointService],
		}).compile()

		service = module.get<PointService>(PointService)
	})
})
