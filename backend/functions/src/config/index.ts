import "dotenv/config"; 

export const ENVIRONMENT: string = process.env.NODE_ENV ? process.env.NODE_ENV: 'development';
export const DB_NAME: string = process.env.DB_NAME ? process.env.DB_NAME: 'development'
export const DB_USER: string = process.env.DB_USER ? process.env.DB_USER: 'root';
export const DB_PASSWORD: string = process.env.DB_PASSWORD ? process.env.DB_PASSWORD: 'password';
export const DB_HOST: string = process.env.DB_HOST ? process.env.DB_HOST: 'localhost';
export const DB_DIALECT: string = process.env.DB_DIALECT ? process.env.DB_DIALECT: 'mysql';
export const DB_NAME_TEST: string = process.env.DB_NAME ? process.env.DB_NAME: 'tes'
export const DB_USER_TEST: string = process.env.DB_USER ? process.env.DB_USER: 'root';
export const DB_PASSWORD_TEST: string = process.env.DB_PASSWORD ? process.env.DB_PASSWORD: 'password';
export const DB_HOST_TEST: string = process.env.DB_HOST ? process.env.DB_HOST: 'localhost';
export const DB_DIALECT_TEST: string = process.env.DB_DIALECT ? process.env.DB_DIALECT: 'mysql';
export const DB_NAME_PROD: string = process.env.DB_NAME_PROD ? process.env.DB_NAME_PROD: 'production';
export const DB_USER_PROD: string = process.env.DB_USER_PROD ? process.env.DB_USER_PROD: 'root';
export const DB_PASSWORD_PROD: string = process.env.DB_PASSWORD_PROD ? process.env.DB_PASSWORD_PROD : 'password';
export const DB_HOST_PROD: string = process.env.DB_HOST_PROD ? process.env.DB_HOST_PROD : 'localhost';
export const DB_DIALECT_PROD: string = process.env.DB_DIALECT_PROD ? process.env.DB_DIALECT_PROD : 'mysql';