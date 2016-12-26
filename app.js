'use strict'
require('./polyfills');
const express = require('express');
const mongoose = require('mongoose');
const useragent = require('express-useragent');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// initialize express
const app = express();

// connect to mongoDB
const connect = () => mongoose.connect('mongodb://127.0.0.1/test');
connect();

const db = mongoose.connection;
db.on('error', console.log);
db.on('disconnected', connect);

fs.readdirSync(__dirname + '/app/model').forEach(file => {
  if (/.js$/.test(file)) require(path.join(__dirname, 'app/model', file));
});

app.listen(3000, () => console.log('listening on port 3000'));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);
app.use(useragent.express());
app.use(express.static('./public'));
require('./routes')(app);
