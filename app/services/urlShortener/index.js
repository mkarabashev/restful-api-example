
const mongoose = require('mongoose');
const Url = mongoose.model('Url');

module.exports = function (data) {
  const longUrl = data.url;

  // check to see if the URL is valid
  if (typeof longUrl !== 'string' || !/.*?\..*?/.test(longUrl)) {
    return { url: { error: 'invalid URL' } };
  }

  return Url.findOne({ url: longUrl })
    .then(doc => doc || Url({url: longUrl}).save())
    .then(doc => doc.encodedUrl)
    .then(shortUrl => ({ longUrl, shortUrl }))
    .then(urlObj => ({ url: urlObj }))
    .catch(console.error);
};
