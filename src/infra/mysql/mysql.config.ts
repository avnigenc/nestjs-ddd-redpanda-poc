import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

const dataSourceOptions: DataSourceOptions = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '123456',
	database: 'credit-redpanda',
	logging: false,
	synchronize: true,
	migrations: [`${__dirname}/migration/*.{ts,js}`],
	entities: [`${__dirname}/entity/*.{ts,js}`],
	subscribers: [`${__dirname}/subscribers/*.{ts,js}`],
};

export const dataSource = new DataSource(dataSourceOptions);
