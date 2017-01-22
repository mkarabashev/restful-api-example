const timeoutPromise = require('./../../utils').timeoutPromise;
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Search = mongoose.model('Search');

const getRecentSearch = (data, callback) => {
  Search.find({}).sort('-searched_at').exec(function (err, docs) {
    if (err) console.error(err);

    const result = docs.slice(0, 10).map(entry => {
      return {
        'query': entry.query,
        'searched_at': entry.searched_at
      };
    });
    callback(null, result);
  });
};

const imgSearch = (data, callback) => {
  // coerce to string and add to request
  const query = String(data.img);
  const search = 'q=' + query + '&';
  const offset = 'offset=' + (data.offset > 0 ? data.offset : 0) + '&';
  const count = 'count=10&';
  const locale = 'mkt=en-us&';
  const safe = 'safeSearch=Moderate';
  const bingUrl = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?' + search + offset + count + locale + safe;

  // save the query to DB
  Search({query: query}).save();

  // fetch results from Bing
  Promise.race([
    fetch(bingUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.BING_KEY
      }
    }),
    timeoutPromise(3000)
  ]).then(function (res) {
    return res.json();
  }).then(function (json) {
    callback(null, json.value);
  }).catch(err => {
    console.error(err);
    callback(null, { error: err });
  });
};

module.exports.imgSearch = imgSearch;
module.exports.getRecentSearch = getRecentSearch;
