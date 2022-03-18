'use strict'

const express = require('express');
const app = express();

require('dotenv').config({ path: '.env.dev' });

const initApi = async () => {
  require('./routers/routes')(app);
  //require('./startup/db')();
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
};

initApi();                                    