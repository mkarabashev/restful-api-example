
const mongoose = require('mongoose');
const Url = mongoose.model('Url');
const encode = require('./base58').encode;

const SITE_URL = process.env.URL || 'localhost:5000';

module.exports = function (data, callback) {
  const longUrl = data.url;
  let shortUrl = '';

  // check to see if the URL is valid
  if (typeof longUrl !== 'string' || !/.*?\..*?/.test(longUrl)) {
    return callback(null, { error: 'invalid URL' });
  }

  function onFind (err, doc) {
    if (err) return console.error(err);

    if (doc) {
      // URL already in the DB; use the entry
      shortUrl = `${SITE_URL}/${encode(doc._id)}`;
      callback(null, {longUrl, shortUrl});
    } else {
      // new URL; make a new entry
      const newQuery = Url({url: longUrl});
      newQuery.save(function (error) {
        if (error) console.log(error);
        shortUrl = `${SITE_URL}/${encode(newQuery._id)}`;
        callback(null, {longUrl, shortUrl});
      });
    }
  }

  Url.findOne({url: longUrl}, onFind);
};
