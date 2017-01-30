const expect = require('chai').expect;
const Search = require('../../app/model/searchModel');
const sinon = require('sinon');
require('sinon-mongoose');
require('sinon-as-promised');

describe('(model) Search', () => {
  let s;

  before(() => s = new Search());

  it('should be invalid if query is empty', done => {
    s.validate(function (err) {
      expect(err.errors.query).to.exist;
      done();
    });
  });

  it('should have a static showRecent that returns recent queries', done => {
    var SearchMock = sinon.mock(Search);
    const expectedDocs = [{ query: 'image', searched_at: 'time' }];

    SearchMock
      .expects('find').withArgs({})
      .chain('sort', '-searched_at')
      .chain('limit', 10)
      .chain('exec')
      .resolves(expectedDocs);

    Search.showRecent().then(res => {
      SearchMock.verify();
      SearchMock.restore();
      expect(res).to.deep.equal(expectedDocs);
      done();
    });
  });

  it('should handle an error on showRecent', done => {
    var SearchMock = sinon.mock(Search);
    SearchMock
      .expects('find').withArgs({})
      .chain('sort', '-searched_at')
      .chain('limit', 10)
      .chain('exec')
      .rejects('error!');

    Search.showRecent().then(err => {
      SearchMock.verify();
      SearchMock.restore();
      expect(err.toString()).to.equal('Error: error!');
      done();
    });
  });
});
