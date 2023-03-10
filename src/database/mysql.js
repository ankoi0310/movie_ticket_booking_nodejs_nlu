import mysql from 'mysql';
import { promisify } from 'util';

const pool = mysql.createPool({
 host: process.env.DB_HOST,
 user: process.env.DB_USERNAME,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_DATABASE,
});

pool.getConnection((err, connection) => {
 if (err) {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') console.error('DATABASE CONNECTION WAS CLOSED');
  if (err.code === 'ER_CON_COUNT_ERROR') console.error('DATABASE HAS TO MANY CONNECTIONS');
  if (err.code === 'ECONNREFUSED') console.error('DATABASE CONNECTION WAS REFUSED');
 }

 if (connection) connection.release();
 console.log('DB is Connected');
 return;
});

pool.query = promisify(pool.query);

export default pool;