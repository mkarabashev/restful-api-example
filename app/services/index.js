const headerParser = require('./headerParser');
const timestamp = require('./timestamp');
const url = require('./urlShortener');
const img = require('./imageSearch');

module.exports.queries = {
  'time': timestamp,
  'whoami': headerParser
};

module.exports.asyncActions = {
  'url': url,
  'img': img.imgSearch,
  'recent': img.getRecentSearch
};
