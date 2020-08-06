const axios = require('axios');
const { apiConfig } = require('../config');
const logger = require('./logger');

const httpClient = axios.create({
  baseURL: apiConfig.rootUrl,
  timeout: 10000,
});

// log all outgoing requests
httpClient.interceptors.request.use((req) => {
  logger.info(`${req.method} request to ${req.url}
  Params: ${req.params ? JSON.stringify(req.params) : ''},
  Data: ${JSON.stringify(req.data)}`);
  return req;
});

module.exports = httpClient;
