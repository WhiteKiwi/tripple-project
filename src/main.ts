import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { json, urlencoded } from 'express'
import helmet from 'helmet'

import { AppModule } from './app.module'
import { Environment } from './lib/types'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService: ConfigService<ConfigEnv> = app.get(ConfigService)
	const port = configService.get('PORT', '3000')

	if (configService.get('ENVIRONMENT') !== Environment.PRODUCTION) {
		setupSwagger(app)
	}

	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ limit: '50mb', extended: true }))
	app.use(helmet())

	await app.listen(port, () =>
		console.log(`API_SERVER listening on port ${port}`),
	)
}
bootstrap()

// Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { version } from '../package.json'
import { ConfigEnv } from './config/configuration'

function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('Tripple Point API')
		.setDescription('Tripple Point API description')
		.setVersion(version)
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	const swaggerCustomOptions = {
		customSiteTitle: 'Tripple Point API Docs',
	}
	SwaggerModule.setup('docs', app, document, swaggerCustomOptions)
}
