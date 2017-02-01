const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Search = mongoose.model('Search');
const timeoutPromise = require('./../../utils').timeoutPromise;
const makeUrl = require('./../../utils').makeUrl;

exports.getRecentSearch = data =>
  Search.showRecent()
    .then(recent => ({ recent: recent }))
    .catch(console.error);

exports.imgSave = data =>
  Search({ query: String(data.img) }).save().catch(console.error);

exports.imgSearch = data => {
  // coerce to string and add to request
  const query = String(data.img);

  // make sure offset is valid
  const offset = data.offset > 0 ? offset : 0;

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
