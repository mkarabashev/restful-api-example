const expect = require('chai').expect;
const encode = require('../../app/services/urlShortener/base58').encode;
const decode = require('../../app/services/urlShortener/base58').decode;

describe('(services) encoder', () => {
  it('should give a base58 number on encode', () => {
    expect(encode(0)).to.equal('1');
    expect(encode(58)).to.equal('Z');
    expect(encode(59)).to.equal('21');
  });

  it('should give a base10 number on decode', () => {
    expect(decode('1')).to.equal(0);
    expect(decode('Z')).to.equal(58);
    expect(decode('21')).to.equal(59);
  });

  it('should be able to decode the encoded values', () => {
    expect(decode(encode(0))).to.equal(0);
    expect(decode(encode(100))).to.equal(100);
    expect(decode(encode(1000))).to.equal(1000);
    expect(decode(encode(999999))).to.equal(999999);
  });
});
