import { createPool } from "mysql2/promise";


export const pool = createPool({
    host:'mysql.railway.internal',
    user:'root',
    password:'PxStHYmbDXPNiYrLyeXtiVjzGGCyrxFM',
    port:'3306',
    database: 'railway',
})
