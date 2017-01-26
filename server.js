'use strict'

require('./polyfills');
const express = require('express');
const mongoose = require('mongoose');
const cluster = require('cluster');
const os = require('os');
const useragent = require('express-useragent');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// add node cluster multithreading when supported (no windows support)
if (os.platform() !== 'win32' && cluster.isMaster) {
  const numCores = os.cpus().length;

  console.log(`Master cluster setting up ${numCores} workers`)
  for (let i = 0; i < numCores; i++) {
    cluster.fork();
  }

  cluster.on(
    'online',
    worker => console.log(`Worker ${worker.process.pid} is online`)
  );

  // reconnect if needed
  cluster.on(
    'exit',
    (worker, code, signal) => (
      console.log(`Worker ${worker.process.pid} died. Code: ${code}, and signal: ${signal} Restarting...`),
      cluster.fork()
  ));

} else {
  // initialize express
  const app = express();

  // connect to mongoDB
  mongoose.Promise = global.Promise;
  const connect = () => mongoose.connect(process.env.MONGODB_URI);
  connect();

  const db = mongoose.connection;
  db.on('error', console.log);
  db.on('disconnected', connect);

  // load the schema
  fs.readdirSync(__dirname + '/app/model').forEach(file => {
    if (/.js$/.test(file)) require(path.join(__dirname, 'app/model', file));
  });

  // provide the port
  app.listen(process.env.PORT, () => console.log(`Process${process.pid} listening on port ${process.env.PORT}`));

  // setup the server
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  app.set('json spaces', 2);
  app.use(useragent.express());

  // provide API
  app.set('views', path.join(__dirname, 'app/views'));
  app.use(express.static('./public'));
  require('./routes')(app);
}
