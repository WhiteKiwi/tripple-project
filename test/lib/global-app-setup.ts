import { INestApplication, ValidationPipe } from '@nestjs/common'

import { json, urlencoded } from 'express'
import helmet from 'helmet'

// Export for e2e testing modules
export function globalAppSetup(app: INestApplication) {
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ limit: '50mb', extended: true }))
	app.use(helmet())
}
