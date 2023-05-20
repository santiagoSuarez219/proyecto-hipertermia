const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.listen(port, () => {
  console.log('Mi port' +  port);
});



// const getConnection = require('./libs/postgres');
// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// // const cv = require('opencv4nodejs');
// const moment = require('moment');

// const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });

// const client = await getConnection();


// const rta = await client.query('SELECT * FROM images');
// console.log(rta.rows);

