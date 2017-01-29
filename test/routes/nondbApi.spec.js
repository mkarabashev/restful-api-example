// Integration tests
const fs = require('fs');
const path = require('path');
const app = require('../../app');

const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;


describe('(server) sync api services requests', () => {
  let server;

  beforeEach(() => server = app().listen(3001));

  afterEach(() => server.close());

  it('should respond with an empty JSON on /api? with no options', done => {
    chai.request('http://localhost:3001')
      .get('/api?')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(Object.keys(res.body)).to.have.length.of(0)
        done();
      });
  });

  it('should respond with a JSON with the time on /api?time', done => {
    chai.request('http://localhost:3001')
      .get('/api?time')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');

        // checking res.body props
        expect(Object.keys(res.body)).to.have.length.of(1);
        expect(res.body).to.have.property('time');

        //checking res.body.time props
        const time = res.body.time;
        expect(Object.keys(time)).to.have.length.of(2);
        expect(time).to.be.a('object');
        expect(time).to.have.property('unix');
        expect(time).to.have.property('natural');
        expect(time.unix).to.be.a('number');
        expect(time.natural).to.be.a('string');
        done();
      });
  });

  it('should respond with a JSON with user data on /api?whoami', done => {
    chai.request('http://localhost:3001')
      .get('/api?whoami')
      .set('accept-language', 'en')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');

        // checking res.body props
        expect(Object.keys(res.body)).to.have.length.of(1);
        expect(res.body).to.have.property('whoami');

        //checking res.body.whoami props
        const whoami = res.body.whoami
        expect(Object.keys(whoami)).to.have.length.of(3);
        expect(whoami).to.be.a('object');
        expect(whoami).to.have.property('ipaddress');
        expect(whoami).to.have.property('languages');
        expect(whoami).to.have.property('os');
        expect(whoami.ipaddress).to.be.a('string');
        expect(whoami.languages).to.be.a('string');
        expect(whoami.os).to.be.a('string');
        done();
      });
  });
});
