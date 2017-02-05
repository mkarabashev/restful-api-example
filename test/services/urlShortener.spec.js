'use strict';

const urlShortener = require('../../app/services/urlShortener');
const Url = require('../../app/model/urlModel');

describe('(services) url shortener', () => {
  let UrlMock;

  beforeEach(() => UrlMock = sinon.mock(Url));

  afterEach(() => {
    UrlMock.verify();
    UrlMock.restore();
  });

  it('should return a long/short url pair', () => {
    const data = { url: 'www.google.com' };
    const expected = {
      url: {
        longUrl: 'www.google.com',
        shortUrl: 'shortUrl'
      }
    };

    UrlMock
      .expects('findOne').withArgs(data)
      .chain('then')
      .chain('then')
      .resolves()
      .resolves('shortUrl');

    expect(urlShortener(data)).to.eventually.deep.equal(expected);
  });

  it('should return an invalid url statement if url is missing a dot', () => {
    expect(urlShortener('not a url')).to.deep.equal({ url: { error: 'invalid URL' } });
  });
});
