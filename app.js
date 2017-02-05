'use strict';

const express = require('express');
const useragent = require('express-useragent');
const fs = require('fs');
const path = require('path');

module.exports = function setupServer () {
  // initialize express
  const app = express();

  // load the schema
  fs.readdirSync(path.join(__dirname, '/app/model')).forEach(file => {
    if (/.js$/.test(file)) require(path.join(__dirname, 'app', 'model', file));
  });

  // hide that the server is running on express
  app.disable('x-powered-by');

  // setup the server
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  app.set('json spaces', 2);
  app.use(useragent.express());

  // provide API
  app.set('views', path.join(__dirname, 'app', 'views'));
  app.use(express.static('./public'));
  require('./routes')(app);

  return app;
};
