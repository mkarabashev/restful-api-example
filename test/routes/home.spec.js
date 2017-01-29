const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;

// constants
const PORT = require('../constants').PORT;
const URL = require('../constants').URL;

const app = require('../../app');

describe('(server) home', () => {
  let server;

  beforeEach(() => {
    server = app().listen(PORT);
  });

  afterEach(() => {
    server.close();
  });

  it('should respond with an html page when user goes to /', done => {
    chai.request(URL)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});
