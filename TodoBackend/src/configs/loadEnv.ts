import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve('src/.env')})

// environment variables
export const PORT=process.env.PORT
export const DATABASE_URI=process.env.DATABASE_URI
export const EMAIL=process.env.EMAIL
export const PASSWORD=process.env.PASSWORD
export const JWT_TOKEN=process.env.JWT_TOKEN
export const JWT_REFRESH_TOKEN=process.env.JWT_REFRESH_TOKEN