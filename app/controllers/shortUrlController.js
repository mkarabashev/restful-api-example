'use strict';

const mongoose = require('mongoose');
const Url = mongoose.model('Url');
const decode = require('../services/urlShortener/base58').decode;

// redirects to the long url
const onUrl = (req, res) => {
  Url.findOne({_id: decode(req.params.shortUrl)}).then(doc => {
    if (doc) {
      const longUrl = (/^http(s?):\/\//.test(doc.url) ? '' : 'https://') + doc.url;
      res.redirect(longUrl);
    } else {
      res.send({ error: `Url doesn't exsist in the database` });
    }
  })
  .catch(console.error);
};

module.exports = onUrl;
