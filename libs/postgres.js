const { Client } = require('pg');

async function getConnection(){
    const client = new Client({
        user: 'santiago',
        host: 'localhost',
        database: 'images',
        password: 'admin123',
        port: 5432
      });
      await client.connect();
      return client;
}

module.exports = getConnection;




