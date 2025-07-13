import mysql from 'mysql2/promise';
require('dotenv').config();


export const pool = mysql.createPool({
  host: process.env.HOST!,
  user: process.env.USERNAME!,
  password: process.env.PASSWORD!,
  database: process.env.DATABASE!,
  port: parseInt(process.env.PORT!, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then(connection => {
    console.log('Connected successfully to the database!');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
