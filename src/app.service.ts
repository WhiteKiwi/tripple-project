import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ConfigEnv } from './config/configuration'

@Injectable()
export class AppService {
	constructor(private readonly configService: ConfigService<ConfigEnv>) {}

	getVersion(): string {
		return this.configService.get('VERSION', '')
	}
}
