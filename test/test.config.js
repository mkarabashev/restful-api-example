'use strict';

// environmental variables
require('dotenv').config();

// modules
global.mongoose = require('mongoose');
mongoose.Promise = global.Promise;

global.sinon = require('sinon');
global.tk = require('timekeeper');
global.chai = require('chai');
global.expect = chai.expect;

// plugins for chai
chai.use(require('chai-as-promised'));
chai.use(require('chai-http'));

// plugins for sinon
require('sinon-mongoose');
require('sinon-as-promised');

// constants
global.PORT = 3001;
global.URL = `http://127.0.0.1:${PORT}`;
