import type { AppConfig } from './config.model';

export const configuration = (): AppConfig => ({
	PORT: Number.parseInt(process.env.PORT, 10),
	TIMEOUT: Number.parseInt(process.env.TIMEOUT, 10) || 10000,
	IS_SWAGGER_ENABLED: process.env.IS_SWAGGER_ENABLED?.toLowerCase() === 'true',
	IS_GRACEFULLY_SHUTDOWN_ENABLED: process.env.IS_GRACEFULLY_SHUTDOWN_ENABLED?.toLowerCase() === 'true',
	NODE_ENV: process.env.NODE_ENV,
	LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
	DATABASE: {
		HOST: process.env.DB_HOST,
		USERNAME: process.env.DB_USERNAME,
		NAME: process.env.DB_NAME,
		PASSWORD: process.env.DB_PASSWORD,
	},
});
