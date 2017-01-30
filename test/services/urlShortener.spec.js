const expect = require('chai').expect;
const sinon = require('sinon');
const urlShortener = require('../../app/services/urlShortener');
const Url = require('../../app/model/urlModel');
require('sinon-mongoose');
require('sinon-as-promised');

describe('(services) url shortener', () => {
  it('should return a long/short url pair', done => {
    const UrlMock = sinon.mock(Url);
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

    urlShortener(data).then(res => {
      UrlMock.verify();
      UrlMock.restore();
      expect(res).to.deep.equal(expected);
      done();
    });
  });

  it('should return an invalid url statement if url is missing a dot', () => {
    expect(urlShortener('not a url')).to.deep.equal({ url: { error: 'invalid URL' } });
  });
});
