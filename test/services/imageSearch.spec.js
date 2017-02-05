'use strict';

const Search = require('../../app/model/searchModel');
const getRecentSearch = require('../../app/services/imageSearch').getRecentSearch;

describe('(services) image search', () => {
  let SearchMock;

  beforeEach(() => SearchMock = sinon.mock(Search));

  afterEach(() => {
    SearchMock.verify();
    SearchMock.restore();
  });

  it('should return the recent search queries', () => {
    const expected = { recent: [] };

    SearchMock
      .expects('showRecent').withArgs()
      .resolves([]);

    expect(getRecentSearch()).to.eventually.deep.equal(expected);
  });
});
