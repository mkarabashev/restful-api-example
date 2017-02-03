const Counter = require('../../app/model/counterModel');

describe('(model) Counter', () => {
  let c;

  before(() => c = new Counter());

  it('should be invalid if _id is empty', done => {
    c.validate(function (err) {
      expect(err.errors._id).to.exist;
      done();
    });
  });

  it('should be invalid when count is empty', done => {
    c.validate(function (err) {
      expect(err.errors.count).to.exist;
      done();
    });
  });
});
