'use strict'
require('./polyfills');
const express = require('express');
const mongoose = require('mongoose');
const useragent = require('express-useragent');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { PORT, DB } = require('./config');


// initialize express
const app = express();

// connect to mongoDB
mongoose.Promise = global.Promise;
const connect = () => mongoose.connect(DB);
connect();

const db = mongoose.connection;
db.on('error', console.log);
db.on('disconnected', connect);

// load the schema
fs.readdirSync(__dirname + '/app/model').forEach(file => {
  if (/.js$/.test(file)) require(path.join(__dirname, 'app/model', file));
});

// provide the port
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// setup the server
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('json spaces', 2);
app.use(useragent.express());

// provide API
app.set('views', path.join(__dirname, 'app/views'));
app.use(express.static('./public'));
require('./routes')(app);
