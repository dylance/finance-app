const passport = require('passport');
const authentication = require('./controllers/authentication');
const categories = require('./controllers/categories');
const expenses = require('./controllers/expenses');
/* eslint-disable no-unused-vars */
const passportService = require('./services/passport');

// session false means don't use cookies
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send('holla');
  });
  app.post('/signup', authentication.signup);
  app.post('/signin', requireSignin, authentication.signin);

  app.post('/create-category', categories.createCategory);
  app.post('/categories', categories.getCategories);

  app.post('/create-expense', expenses.createExpense);
  app.get('/expenses', expenses.getExpenses);
};
