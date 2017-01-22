
// return an object with the unix timestamp
module.exports = data => {
  let unix = null;
  let natural = null;
  let time = null;
  const query = data.time;

  if (query.length === 10 && /\d{10}/.test(query)) time = new Date(query * 1000);
  else if (query.length === 0) time = new Date();
  else time = new Date(query);

  if (time !== 'Invalid Date') {
    const locale = 'en-us';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    unix = Math.round(time.getTime() / 1000);
    natural = time.toLocaleString(locale, options);
  }

  return {unix, natural};
};
