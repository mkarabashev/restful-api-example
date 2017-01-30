const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Search = mongoose.model('Search');
const timeoutPromise = require('./../../utils').timeoutPromise;
const makeUrl = require('./../../utils').makeUrl;

const getRecentSearch = (data) =>
  Search.showRecent()
    .then(recent => ({ recent: recent }))
    .catch(console.error);

const imgSearch = (data) => {
  // coerce to string and add to request
  const query = String(data.img);

  // make sure offset is valid
  const offset = data.offset > 0 ? offset : 0;

  // save the query to DB
  Search({ query: query }).save().catch(console.error);

  // fetch results from Bing
  return Promise.race([
    fetch(makeUrl(query, offset), {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.BING_KEY || 'fail' // no defaults here
      }
    }),
    timeoutPromise(3000)
  ])
  .then(res => res.json())
  .then(json => ({ img: json.value }))
  .catch(console.error);
};

module.exports.imgSearch = imgSearch;
module.exports.getRecentSearch = getRecentSearch;
