'use strict';

const mongoose = require('mongoose');
const Url = mongoose.model('Url');
const encode = require('./base58').encode;

module.exports = function (data, callback) {
  const longUrl = data.url;
  let shortUrl = '';

  function onFind (err, doc) {
    if (err) console.error(err);

    if (doc) {
      shortUrl = 'localhost:3000/' + encode(doc._id);
      callback(null, {longUrl, shortUrl});
    } else {
      const newQuery = Url({url: longUrl});
      newQuery.save(function (error) {
        if (error) console.log(error);
        shortUrl = 'localhost:3000/' + encode(newQuery._id);
        callback(null, {longUrl, shortUrl});
      });
    }
  }

  Url.findOne({url: longUrl}, onFind);
};
