import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';
import { DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USER } from "./config.js";

dotenv.config({path:'./src/env/.env'})

export const pool = createPool({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    port:DB_PORT,
    database: DB_NAME,
})
