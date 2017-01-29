const app = require('../../app');

const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;


describe('(server) home', () => {
  let server;

  beforeEach(() => {
    server = app().listen(3001);
  });

  afterEach(() => {
    server.close();
  });

  it('should respond with an html page when user goes to /', done => {
    chai.request('http://localhost:3001')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});
