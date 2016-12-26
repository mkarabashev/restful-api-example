'use strict';

const async = require('async');
const queries = require('../services').queries;
const asyncActions = require('../services').asyncActions;

const api = (req, res) => {
  let answer = {};
  let actionList = {};

  let data = Object.assign({}, req.query);
  data.os = req.useragent.os;
  data.remoteAddress = req.connection.remoteAddress;
  data.language = req.headers["accept-language"];
  data.proxy = req.headers['x-forwarded-for'];

  const final = (err, results) => {
    for (let fn in req.query) {
      if (!req.query.hasOwnProperty(fn) || !queries[fn]) continue;
      answer = Object.assign(answer, {[fn]: queries[fn](data)});
    }
    for (let result in results) {
      if (!results.hasOwnProperty(result)) continue;
      answer = Object.assign(answer, {[result]: results[result]});
    }

    res.json(answer);
  };

  for (let fn in req.query) {
    if (!req.query.hasOwnProperty(fn) || !asyncActions[fn]) continue;
    actionList[fn] = asyncActions[fn].bind(null, data);
  }

  async.parallel(actionList, final);
};

module.exports = api;
