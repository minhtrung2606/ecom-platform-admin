import mysql from 'mysql2';

const {
  DB_CONNECTION_LIMIT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env;

const pool = mysql.createPool({
  connectionLimit: DB_CONNECTION_LIMIT,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const db = pool.promise();

export default db;
