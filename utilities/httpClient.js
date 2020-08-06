const axios = require('axios');
const { apiConfig } = require('../config');
const logger = require('./logger');

const httpClient = axios.create({
  baseURL: apiConfig.rootUrl,
  timeout: 10000,
});

httpClient.interceptors.request.use((req) => {
  logger.info(
    'Sending Request',
    req.method,
    req.url,
    JSON.stringify(req.params),
    JSON.stringify(req.data)
  );
  return req;
});

module.exports = httpClient;
