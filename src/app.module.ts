import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ApplicationModule } from '@modules/application/application.module'

import path from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration, { ConfigEnv } from './config/configuration'
import validationSchema from './config/validation-schema'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			load: [configuration],
			validationSchema,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService<ConfigEnv>) => ({
				type: 'mysql',
				host: configService.get('TYPEORM_HOST'),
				port: +configService.get('TYPEORM_PORT'),
				database: configService.get('TYPEORM_DATABASE'),
				username: configService.get('TYPEORM_USERNAME'),
				password: configService.get('TYPEORM_PASSWORD'),
				entities: [path.join(__dirname, './typeorm/entities/*.{ts,js}')],
				migrations: [path.join(__dirname, './typeorm/migrations/*.{ts,js}')],
				migrationsRun: true,
				keepConnectionAlive: true,
				// This value must be false! - https://typeorm.io/#/connection-options/common-connection-options
				synchronize: false,
			}),
			inject: [ConfigService],
		}),
		ApplicationModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
