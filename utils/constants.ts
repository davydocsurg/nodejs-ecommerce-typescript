import dotenv from "dotenv";

dotenv.config();

export const PRODUCTS_JSON_PATH = `${process.cwd()}/data/products.json`;
export const CART_JSON_PATH = `${process.cwd()}/data/cart.json`;

// database
export const dbHost = process.env.DB_HOST;
export const dbUser = process.env.DB_USER;
export const db = process.env.DB_NAME;
export const pwd = process.env.DB_PASSWORD;
