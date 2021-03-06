'use strict';

const headerParser = require('./headerParser');
const timestamp = require('./timestamp');
const url = require('./urlShortener');
const img = require('./imageSearch');

module.exports = {
  time: timestamp,
  whoami: headerParser,
  url: url,
  img: data => {
    img.imgSave(data);
    return img.imgSearch(data);
  },
  recent: img.getRecentSearch
};
