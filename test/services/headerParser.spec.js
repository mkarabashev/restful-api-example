'use strict';

const headerParser = require('../../app/services/headerParser');

describe('(services) header parser', () => {
  let outcome, defaultData;

  before(() => {
    outcome = {
      whoami: {
        ipaddress: '127.0.0.1',
        languages: 'de, en',
        os: 'os'
      }
    };

    defaultData = {
      os: 'os',
      language: 'de, en; some other info'
    };
  });

  it('should return a user data object when proxy is present', () => {
    const proxyData = Object.assign({}, defaultData, { proxy: '127.0.0.1, 198.2.1.100' });
    expect(headerParser(proxyData)).to.deep.equal(outcome);
  });

  it('should return a user data object when remoteAddress is present', () => {
    const addressData = Object.assign({}, defaultData, { remoteAddress: '127.0.0.1, 198.2.1.100' });
    expect(headerParser(addressData)).to.deep.equal(outcome);
  });
});
