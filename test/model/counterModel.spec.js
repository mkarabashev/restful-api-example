'use strict';

const Counter = require('../../app/model/counterModel');
const modelValidate = require('../utils').modelValidate;

describe('(model) Counter', () => {
  let counterValidate;

  before(() => counterValidate = modelValidate(new Counter()));

  it('should be invalid if _id is empty', done => {
    counterValidate('_id', done);
  });

  it('should be invalid when count is empty', done => {
    counterValidate('count', done);
  });
});
