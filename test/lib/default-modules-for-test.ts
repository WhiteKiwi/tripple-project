import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import path from 'path'

import configuration, { ConfigEnv } from '../../src/config/configuration'
import validationSchema from '../../src/config/validation-schema'

export const defaultModulesForTest = [
	ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: 'test/.env',
		load: [configuration],
		validationSchema,
	}),
	TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService<ConfigEnv>) => ({
			type: 'postgres',
			host: configService.get('TYPEORM_HOST'),
			port: +configService.get('TYPEORM_PORT'),
			database: configService.get('TYPEORM_DATABASE'),
			username: configService.get('TYPEORM_USERNAME'),
			password: configService.get('TYPEORM_PASSWORD'),

			entities: [path.join(__dirname, '../../src/typeorm/entities/*.{ts,js}')],
			migrations: [
				path.join(__dirname, '../../src/typeorm/migrations/*.{ts,js}'),
			],
			migrationsRun: true,
			keepConnectionAlive: true,
			// This value must be false! - https://typeorm.io/#/connection-options/common-connection-options
			synchronize: false,
		}),
		inject: [ConfigService],
	}),
]
