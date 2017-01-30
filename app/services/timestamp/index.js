const currentTime = require('../../utils/currentTime');

// return an object with the unix timestamp
module.exports = data => {
  const locale = 'en-us';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const query = data.time;
  let unix, natural, time;
  unix = null;

  if (query.length && query.length !== 0 && +query === +query) time = new Date(query * 1000);
  else if (query.length === 0) time = currentTime();
  else time = new Date(query);

  if (time.toString() !== 'Invalid Date') {
    unix = Math.round(time.getTime() / 1000);
    natural = time.toLocaleString(locale, options);
  } else natural = time.toString();

  return { time: { unix, natural } };
};
