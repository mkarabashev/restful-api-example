const expect = require('chai').expect;
const sinon = require('sinon');
const Search = require('../../app/model/searchModel');
const getRecentSearch = require('../../app/services/imageSearch').getRecentSearch;
// const imgSearch = require('../../app/services/imageSearch').imgSearch;
require('sinon-mongoose');
require('sinon-as-promised');

describe('(services) image search', () => {
  it('should return the recent search queries', done => {
    const SearchMock = sinon.mock(Search);
    const expected = { recent: [] };

    SearchMock
      .expects('showRecent').withArgs()
      .resolves([]);

    getRecentSearch().then(res => {
      SearchMock.verify();
      SearchMock.restore();
      expect(res).to.deep.equal(expected);
      done();
    });
  });
});
