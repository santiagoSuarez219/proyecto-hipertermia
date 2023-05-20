const { Pool } = require('pg');

const pool = new Pool({
    user: 'santiago',
    host: 'localhost',
    database: 'images',
    password: 'admin123',
    port: 5432
  });
module.exports = pool;




