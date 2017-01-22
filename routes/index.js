
const routes = app => {
  app.use(require('./home'));
  app.use(require('./api'));
  app.use(require('./shortUrl'));
  app.use(require('./upload'));
};

module.exports = routes;
