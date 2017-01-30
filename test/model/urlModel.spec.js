const expect = require('chai').expect;
const Url = require('../../app/model/urlModel');

describe('(model) Url', () => {
  let u;

  before(() => u = new Url());

  it('should be invalid if url is empty', done => {
    u.validate(function (err) {
      expect(err.errors.url).to.exist;
      done();
    });
  });

  it('should be invalid if _id is empty', done => {
    u.validate(function (err) {
      expect(err.errors.url).to.exist;
      done();
    });
  });

  it('should provide a short url on encodedUrl', () => {
    const shortUrl = new Url({ url: 'url', _id: 59 });
    const expected = 'localhost:5000/21';
    expect(shortUrl.encodedUrl).to.equal(expected);
  });
});
