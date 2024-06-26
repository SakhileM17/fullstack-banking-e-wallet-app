const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

const pool = new Pool({

  user: process.env.DB_USER, // database username
  password: process.env.DB_PASSWORD, // dataebase password
  host: process.env.DB_HOST, //database host
  port: process.env.DB_PORT, // database port
  database: process.env.DB_DATABASE // database name

});

const getClient = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    return null;
  }
};
// Define a simple query to execute
const testQuery = 'SELECT $1::text as message';

// Use the pool to execute the query
pool.query(testQuery, ['Connection test successful'], (err, res) => {
  if (err) {
    console.error('Error executing query:', err);
  } else {
    console.log('Connection test successful');
    // If you want, you can log the result
    console.log('Result:', res.rows[0].message);
  }
});


module.exports = { pool, getClient };