'use strict';

const Search = require('../../app/model/searchModel');
const modelValidate = require('../utils').modelValidate;

describe('(model) Search', () => {
  let searchValidate, SearchMock;

  before(() => searchValidate = modelValidate(new Search()));

  beforeEach(() => SearchMock = sinon.mock(Search));

  afterEach(() => {
    SearchMock.verify();
    SearchMock.restore();
  });

  it('should be invalid if query is empty', done => {
    searchValidate('query', done);
  });

  it('should have a static showRecent that returns recent queries', () => {
    const expectedDocs = [{ query: 'image', searched_at: 'time' }];

    SearchMock
      .expects('find').withArgs({})
      .chain('sort', '-searched_at')
      .chain('limit', 10)
      .chain('exec')
      .resolves(expectedDocs);

    expect(Search.showRecent()).to.eventually.deep.equal(expectedDocs);
  });

  it('should handle an error on showRecent', () => {
    SearchMock
      .expects('find').withArgs({})
      .chain('sort', '-searched_at')
      .chain('limit', 10)
      .chain('exec')
      .rejects('error!');

    expect(Search.showRecent()).to.eventually.deep.equal(new Error('error!'));
  });
});
