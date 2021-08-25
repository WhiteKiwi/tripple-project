import { version } from '../../package.json'

const configuration = {
	VERSION: version,
	PORT: process.env.PORT,
	ENVIRONMENT: process.env.ENVIRONMENT,
	// TypeORM
	TYPEORM_HOST: process.env.TYPEORM_HOST,
	TYPEORM_PORT: process.env.TYPEORM_PORT,
	TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
	TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
	TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
	// REDIS
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PORT: process.env.REDIS_PORT,
	REDIS_PASSWORD: process.env.REDIS_PASSWORD,
}
export type ConfigEnv = Record<keyof typeof configuration, string>
export default () => configuration
