import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'madinah_api',
  password: process.env.DB_PASS || 'Mad1n4hAPI!',
  database: process.env.DB_NAME || 'madinah_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

export default pool;
