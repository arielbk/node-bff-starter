const { apiConfig } = require('../config');
const httpClient = require('../utilities/httpClient');

exports.login = (req, res) => {
  const credentials = {
    username: req.body.username,
    password: req.body.password,
  };

  httpClient({
    method: 'post',
    url: apiConfig.loginPath,
    data: credentials,
    auth: credentials,
  })
    .then((response) => {
      req.session.credentials = credentials;
      req.session.user = response.data;
      res.json(response.data);
    })
    .catch((err) => {
      res.sendStatus(err.response.status);
    });
};

exports.currentUser = (req, res) => {
  res.json(req.session.user);
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json();
  });
};

exports.auth = (req, res, next) => {
  if (!req.session.credentials || !req.session.user) {
    res.sendStatus(401);
  } else {
    next();
  }
};
