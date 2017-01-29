const expect = require('chai').expect;
const sinon = require('sinon');
const Url = require('../../app/model/urlModel');

describe('(model) Url', () => {
  let u;

  before(() => u = new Url);

  it('should be invalid if url is empty', done => {
    u.validate(function(err) {
      expect(err.errors.url).to.exist;
      done();
    });
  });

  it('should be invalid if _id is empty', done => {
    u.validate(function(err) {
      expect(err.errors.url).to.exist;
      done();
    });
  });
});
