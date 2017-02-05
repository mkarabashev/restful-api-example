'use strict';

// this code glues together most of the api services
// except for url redirects and file size checking
const api = (req, res, services) => {
  let data = Object.assign({}, req.query);
  data.os = req.useragent.os;
  data.remoteAddress = req.connection.remoteAddress;
  data.language = req.headers['accept-language'];
  data.proxy = req.headers['x-forwarded-for'];

  let activeServices = [];
  for (let fn in req.query) {
    if (!req.query.hasOwnProperty(fn) || !services[fn]) continue;
    activeServices.push(services[fn]);
  }

  Promise.all(activeServices.map(fn => fn(data)))
    .then(arr => Object.assign({}, ...arr))
    .then(answer => res.json(answer))
    .catch(console.error);
};

module.exports = api;
