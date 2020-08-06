const express = require('express');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const FileStore = require('session-file-store');
const router = require('./router');

const app = express();

// helmet bundled security middleware
app.use(helmet());

// session storage
const secret = '5ecre7-X3Y';
app.use(
  session({
    store: new FileStore({ secret }),
    secret,
    resave: false,
    saveUninitialized: true,
  })
);

// serve frontend for non-api calls
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const root = path.join(__dirname);
  return res.sendFile('index.html', { root });
});

// else route the request
router(app);

const port = process.env.PORT || 3333;
app.listen(port);
