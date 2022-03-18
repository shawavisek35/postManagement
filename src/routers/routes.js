'use strict';

const { json, urlencoded } = require('express');
const { router } = require('./apiRoute');
const { verifyIdToken } = require('../helpers/auth');

module.exports = function (app) {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(verifyIdToken);

  //routes
  app.use('/', router);
};