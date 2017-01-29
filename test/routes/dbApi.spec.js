// integration tests
// testing framework
const fetchMock = require('fetch-mock');
const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;

// mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// app
const app = require('../../app');

// db
require('../../app/model/searchModel');
require('../../app/model/urlModel');
require('../../app/model/counterModel');
const Search = mongoose.model('Search');
const Url = mongoose.model('Url');
const Counter = mongoose.model('Counter');

describe('(server) async api services requests', () => {
  let db, server;

  before(done => {
    mongoose.connect('mongodb://127.0.0.1/test-restap');
    mongoose.connection.once('open', () =>
      // test db always starts empty
      // we must wait for Counter to create its first entry
      new Promise((resolve, reject) => {
        let counter = 0;
        const interval = setInterval(
          () => Counter.findOne({ _id: 'url_count' }).then(res => {
            counter++;
            if (res && res.count == 1000) {
              clearInterval(interval);
              resolve();
            } else if (counter == 1999) {
              clearInterval(interval);
              reject('Counter isn\'t initializing');
            }
          }), 1);
      })
      // start creating db entries
      .then(() => Promise.all([
        Search({ query: 'cats' }).save(),
        Url({ url: 'http://localhost:3001' }).save()
      ]))
      .then(() => done())
      .catch(err => done(err))
    );
  });

  beforeEach(() => server = app().listen(3001));

  afterEach(() => {
    server.close();
    fetchMock.restore();
    fetchMock.reset();
  });

  after(() => Promise.all([
    Search.remove({}),
    Counter.remove({}),
    Url.remove({})
  ])
  .then(() => mongoose.disconnect()));

  it('should respond with a JSON with the recent image queries on /api?recent', done => {
    chai.request('http://localhost:3001')
      .get('/api?recent')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');

        // checking res.body props
        expect(Object.keys(res.body)).to.have.length.of(1);
        expect(res.body).to.have.property('recent');

        //checking res.body.recent props
        expect(Object.keys(res.body.recent)).to.have.length.of(1);
        expect(res.body.recent).to.be.a('array');

        // checking res.body.recent.children
        const result = res.body.recent[0];
        expect(Object.keys(result)).to.have.length.of(2);
        expect(result).to.have.property('query');
        expect(result).to.have.property('searched_at');
        expect(result.query).to.be.a('string');
        expect(result.searched_at).to.be.a('string');
        done();
      });
  });

  it('should respond with a JSON with the image results on /api?img=dogs', done => {
    fetchMock.get('*', {});
    chai.request('http://localhost:3001')
      .get('/api?img=dogs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        Search.remove({ query: 'dogs' })
        done();
      });
  });

  it('should return a JSON with a short url on /api?url=www.google.com', done => {
    chai.request('http://localhost:3001')
      .get('/api?url=www.google.com')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;

        // check res.body
        expect(Object.keys(res.body)).to.have.length.of(1);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('url');

        // check res.body.url
        const url = res.body.url;
        expect(Object.keys(url)).to.have.length.of(2);
        expect(url).to.be.a('object');
        expect(url).to.have.property('shortUrl');
        expect(url).to.have.property('longUrl');
        expect(url.shortUrl).to.be.a('string');
        expect(url.longUrl).to.be.a('string');
        done();
      });
  });

  it('should redirect on /:shortUrl', done => {
    chai.request('http://localhost:3001')
      .get('/ig')
      .end((err, res) => {
        expect(res).to.redirect;
        expect(res).to.redirectTo('http://localhost:3001/')
        done();
      });
  });
});
