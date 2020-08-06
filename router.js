const { auth, login, logout, currentUser } = require('./middleware/auth');
const proxy = require('./middleware/proxy');
const trans = require('./middleware/translate');

const router = (app) => {
  app.post('/api/login', login);
  app.get('/api/logout', logout);
  app.get('/api/check-auth', auth, currentUser);
  app.get('/locales/translations', trans);

  app.all('/api/*', auth, proxy);
};

module.exports = router;
