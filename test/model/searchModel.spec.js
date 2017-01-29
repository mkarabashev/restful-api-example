const expect = require('chai').expect;
const Search = require('../../app/model/searchModel');

describe('(model) Search', () => {
  let s;

  before(() => s = new Search);

  it('should be invalid if query is empty', done => {
    s.validate(function(err) {
      expect(err.errors.query).to.exist;
      done();
    });
  });
});
