import * as dotenv from "dotenv";

dotenv.config();

export const PRODUCTS_JSON_PATH = `${process.cwd()}/data/products.json`;
export const CART_JSON_PATH = `${process.cwd()}/data/cart.json`;

// database
export const dbHost = process.env.MYSQL_DB_HOST;
export const dbUser = process.env.MYSQL_DB_USER;
export const db = process.env.MYSQL_DB_NAME;
export const pwd = process.env.MYSQL_DB_PASSWORD;
export const port = process.env.MYSQL_DB_PORT;
export const dbConnection = process.env.MY_SQL_DB_CONNECTION_LIMIT;

// mongodb
export const mongoDbUrl: string = process.env.MONGO_DB_URL;
export const localDB: string = process.env.LOCAL_DB;

// mailing
export const smtpUsername: string = process.env.SMTP_USERNAME;
export const smtpPassword: string = process.env.SMTP_PASSWORD;
