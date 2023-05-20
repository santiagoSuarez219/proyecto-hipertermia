const express = require('express');

const imageRouter = require('./images.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/image', imageRouter);
}

module.exports = routerApi;
