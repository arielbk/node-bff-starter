const path = require('path');

exports.projectConfig = {
  name: 'seeus_v2',
  port: 8064,
};

const apiConfig = {
  loginPath: '/account/login',
};

let rootUrl = '';
switch (process.env.NODE_ENV) {
  case 'production':
    rootUrl = 'http://seeusdemoapi.swissinnolab.com/seeus/service/rest';
    break;
  case 'demo':
    rootUrl = 'http://seeusdemoapi.swissinnolab.com/seeus/service/rest';
    break;
  default:
    rootUrl = 'https://seeustestapi.swissinnolab.com/seeus/service/rest';
    break;
}

apiConfig.rootUrl = rootUrl;
exports.apiConfig = apiConfig;

exports.poeditorConfig = {
  apiToken: '910744d28206a5b5e35cbb96e3f88140',
  projectId: '156331',
  localesPath: path.resolve(`${path.dirname(__filename)}/locales`),
};

exports.debugMode = process.env.NODE_ENV !== 'production';
exports.logLevel = process.env.NODE_ENV !== 'production' ? 'debug' : 'info';
