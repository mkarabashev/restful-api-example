'use strict';

const mongoose = require('mongoose');
const Url = mongoose.model('Url');
const decode = require('../services/urlShortener/base58').decode;

const onUrl = (req, res) => {
  Url.findOne({_id: decode(req.params.shortUrl)}, (err, doc) => {
    if (err) console.error(err);

    if (doc) {
      const longUrl = (/^http(s?):\/\//.test(doc.url) ? '' : 'https://') + doc.url;
      res.redirect(longUrl);
    } else {
      res.send({ error: `Url doesn't exsist in the database` });
    }
  });
};

module.exports = onUrl;
