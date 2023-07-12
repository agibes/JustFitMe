const { Pool } = require('pg');

//Use this port 3000-When Viewing the fron end data switch to 5433 when running system test. 
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/fitness-dev';

const client = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;
