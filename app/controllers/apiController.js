const async = require('async');
const empty = require('../utils').empty;
const queries = require('../services').queries;
const asyncActions = require('../services').asyncActions;

// this code glues together most of the api services
// except for url redirects and file size checking
const api = (req, res) => {
  let data = Object.assign({}, req.query);
  data.os = req.useragent.os;
  data.remoteAddress = req.connection.remoteAddress;
  data.language = req.headers['accept-language'];
  data.proxy = req.headers['x-forwarded-for'];

  // do async services (database)
  const asyncServices = () => {
    let actionList = {};

    for (let fn in req.query) {
      if (!req.query.hasOwnProperty(fn) || !asyncActions[fn]) continue;
      actionList[fn] = asyncActions[fn].bind(empty, data);
    }

    return actionList;
  };

  // do sync services, combine them with async, then send as json
  const final = (err, results) => {
    let answer = {};
    if (err) console.error(err);

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

  // gate; wait for async services to finish before proceeding
  async.parallel(asyncServices(), final);
};

module.exports = api;
