import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import IORedis from 'ioredis'

import { ConfigEnv } from '../../../config/configuration'

@Injectable()
export class RedisService {
	private redis: IORedis.Redis

	constructor(private readonly configService: ConfigService<ConfigEnv>) {
		this.redis = new IORedis({
			port: this.configService.get('REDIS_PORT'),
			host: this.configService.get('REDIS_HOST'),
			password: this.configService.get('REDIS_PASSWORD'),
		})
	}

	async get(key: string) {
		return await this.redis.get(key)
	}

	async set(key: string, value: IORedis.ValueType) {
		return await this.redis.set(key, value)
	}
}
