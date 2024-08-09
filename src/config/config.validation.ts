import { Transform, Type, plainToInstance } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min, validateSync } from 'class-validator';

class EnvironmentVariable {
	@IsNumber()
	@Type(() => Number)
	@Min(0)
	@Max(65535)
	PORT: number;

	@IsNumber()
	@Type(() => Number)
	TIMEOUT = 10_000;

	@IsOptional()
	@IsBoolean({ message: 'Invalid boolean format' })
	@Transform(({ value }) => value === 'true')
	IS_SWAGGER_ENABLED = true;

	@IsOptional()
	@IsBoolean({ message: 'Invalid boolean format' })
	@Transform(({ value }) => value === 'true')
	IS_GRACEFULLY_SHUTDOWN_ENABLED = false;

	@IsString()
	NODE_ENV: string;

	@IsString()
	DB_HOST: string;

	@IsString()
	DB_USERNAME: string;

	@IsString()
	DB_PASSWORD: string;

	@IsString()
	DB_NAME: string;
}

export class EnvironmentValidationError extends Error {}

export const validate = (config: Record<string, string>): EnvironmentVariable => {
	const validatedConfig = plainToInstance(EnvironmentVariable, config, { enableImplicitConversion: true });

	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length) {
		throw new EnvironmentValidationError(
			`Config validation failed! Please check the error details and fix the misconfigured values: ${errors.toString()}`,
		);
	}

	return validatedConfig;
};
