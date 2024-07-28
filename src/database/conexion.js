import { createPool } from "mysql2/promise";


export const pool = createPool({
    host:'bjgzprkm0lj9wzuvwfst-mysql.services.clever-cloud.coml',
    user:'u9valdyliud6ru3c',
    password:'L5AQDri7BqCn7m4O0qvT',
    port:3306,
    database: 'bjgzprkm0lj9wzuvwfst',
})
