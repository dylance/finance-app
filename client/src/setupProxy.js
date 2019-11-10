const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/signin', { target: 'http://localhost:5000' }));
  app.use(proxy('/signup', { target: 'http://localhost:5000' }));
  app.use(proxy('/create-category', { target: 'http://localhost:5000' }));
  app.use(proxy('/categories', { target: 'http://localhost:5000' }));
};
