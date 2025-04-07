import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const database = process.env.DB_DATABASE as string;
const user = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD as string;

export const sequelize = new Sequelize(database, user, password, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});
