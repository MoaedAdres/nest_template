import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config(); // this way it will load the .env file and it will look at it in the first place
const env =
  process.env.NODE_ENV == 'development' ? 'development' : 'production';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) }); // // it will add either the .env.prod fiel or .env.dev file and it will look at it if he didn't find the variable in the .env file

// in this case it will look in the env file first to look for the variable then it will look into the file that loaded based on the condition
//because we did the dotenv.config first then we specify another file
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
