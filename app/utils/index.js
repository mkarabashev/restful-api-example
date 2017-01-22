exports.timeoutPromise = time => new Promise(function (resolve, reject) {
  setTimeout(
    () => reject(`Timeout after ${time}ms`),
    time
  );
});
