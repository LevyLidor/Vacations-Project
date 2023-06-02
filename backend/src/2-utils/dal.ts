import mysql, { RowDataPacket } from "mysql2";

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306, 
    database: 'vacations'
});

export function execute<T>(query: string, params?: any[]) {
    return pool.promise().execute<T & RowDataPacket[]>(query, params);
};


