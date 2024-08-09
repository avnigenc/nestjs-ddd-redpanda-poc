export interface HttpConfig {
	BASE_URL: string;
	TIMEOUT: number;
	RETRY: number;
}

export interface HttpConfigWithCredential extends HttpConfig {
	CLIENT_ID: string;
	CLIENT_SECRET: string;
}

export interface HttpConfigWithApplication extends HttpConfig {
	APPLICATION_ID: string;
}

export interface HttpConfigWithCredit extends HttpConfig {
	CLIENT_ID: string;
	CLIENT_SECRET: string;
}

export interface DatabaseConfig {
	HOST: string;
	USERNAME: string;
	NAME: string;
	PASSWORD: string;
}

export interface AppConfig {
	PORT: number;
	TIMEOUT: number;
	IS_SWAGGER_ENABLED: boolean;
	IS_GRACEFULLY_SHUTDOWN_ENABLED: boolean;
	LOG_LEVEL: string;
	NODE_ENV: string;
	DATABASE: DatabaseConfig;
}
