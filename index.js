const express = require('express');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);
const compression = require('compression');
const router = require('./router');
const logger = require('./utilities/logger');

// initialize the express app
const app = express();

// helmet bundled security middleware
// app.use(helmet());

// gzip compress responses
app.use(compression());

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// serve frontend for non-api calls
const root = path.join(__dirname, 'client', 'dist');
app.use(express.static(root));
app.use((req, res, next) => {
  if (
    req.method === 'GET' &&
    req.accepts('html') &&
    !req.is('json') &&
    !req.path.startsWith('/api') &&
    !req.path.startsWith('/locales')
  ) {
    res.sendFile('index.html', { root });
  } else next();
});

// else route the request
router(app);

// log confirmation that the server is running along with the port number
const PORT = process.env.PORT || 3333;
app.listen(PORT);
logger.info(`Server listening on port ${PORT}`);
