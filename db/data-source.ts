import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const env =
  process.env.NODE_ENV == 'development' ? 'development' : 'production';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
