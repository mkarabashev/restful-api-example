'use strict';

let timestamp = require('../../app/services/timestamp'); ;

describe('(services) timestamp', () => {
  let defaultOutcome, naturalTime, unixTime;

  before(() => {
    naturalTime = 'December 15, 2015';
    unixTime = 1450130400;

    defaultOutcome = { time: { unix: unixTime, natural: naturalTime } };
    tk.freeze(unixTime * 1000);
  });

  after(() => {
    tk.reset();
  });

  it('should return an object telling you the input is an "Invalid Date"', () => {
    const data = { time: 'no time here' };
    expect(timestamp(data)).to.deep.equal({ time: { unix: null, natural: 'Invalid Date' } });
  });

  it('should return current time when missing a time property', () => {
    const data = { time: '' };
    expect(timestamp(data)).to.deep.equal(defaultOutcome);
  });

  it('should return unix time when given natural time', () => {
    const data = { time: naturalTime };
    expect(timestamp(data)).to.deep.equal(defaultOutcome);
  });

  it('should return natural time when given unix time', () => {
    const data = { time: '' + unixTime };
    expect(timestamp(data)).to.deep.equal(defaultOutcome);
  });

  it('should return natural time when given unix time of varying length', () => {
    const data1 = { time: '145013040' };
    const outcome1 = {
      time: {
        unix: 145013040,
        natural: 'August 6, 1974'
      }
    };

    const data2 = { time: '14501304000' };
    const outcome2 = {
      time: {
        unix: 14501304000,
        natural: 'July 12, 2429'
      }
    };

    expect(timestamp(data1)).to.deep.equal(outcome1);
    expect(timestamp(data2)).to.deep.equal(outcome2);
  });
});
