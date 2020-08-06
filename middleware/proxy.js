const httpClient = require('../utilities/httpClient');
const logger = require('../utilities/logger');
const { apiConfig } = require('../config');

module.exports = function proxy(req, res) {
  const { credentials } = req.session;
  const apiurl = apiConfig.rootUrl + req.path.split('/api').pop();

  httpClient({
    method: req.method,
    url: apiurl,
    data: req.body,
    params: req.query,
    auth: {
      username: credentials.username,
      password: credentials.password,
    },
    responseType: 'arraybuffer',
  })
    .then((response) => {
      res.set('content-type', response.headers['content-type']);
      res.send(response.data);
    })
    .catch((err) => {
      logger.error('Error response: ', err.response.status, err.response.data);
      if (err.response.status === 401) {
        req.session.destroy(() => {
          res.status(err.response.status).json(err.response.data);
        });
      } else {
        res.status(err.response.status).json(err.response.data);
      }
    });
};
