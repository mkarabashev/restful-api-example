'use strict';

const Url = require('../../app/model/urlModel');
const modelValidate = require('../utils').modelValidate;

describe('(model) Url', () => {
  let urlValidate;

  before(() => urlValidate = modelValidate(new Url()));

  it('should be invalid if url is empty', done => {
    urlValidate('url', done);
  });

  it('should provide a short url on encodedUrl', () => {
    const shortUrl = new Url({ url: 'url', _id: 59 });
    const expected = 'localhost:5000/21';
    expect(shortUrl.encodedUrl).to.equal(expected);
  });
});
