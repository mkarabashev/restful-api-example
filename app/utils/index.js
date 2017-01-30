exports.timeoutPromise = time => new Promise(function (resolve, reject) {
  setTimeout(
    () => reject(`Timeout after ${time}ms`),
    time
  );
});

exports.makeUrl = (query, offset) => {
  const bingUrl = 'https://api.cognitive.microsoft.com/bing/v5.0/images';
  const options = 'count=10&mkt=en-us&safeSearch=Moderate';
  return `${bingUrl}/search?q=${query}&offset=${offset}&${options}`;
};
