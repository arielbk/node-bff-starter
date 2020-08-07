const { projectConfig } = require('./config');

const { name, port, repo, servers } = projectConfig;

// this is the config file for our Node JS process manager -- PM2
module.exports = {
  // APPS -- define our app name and port
  apps: [
    {
      name: `${name}:${port}`,
      script: 'src/index.js',
      watch: true,
      ignore_watch: ['sessions'],
      env_test: {
        NODE_ENV: 'test',
        PORT: port,
      },
      env_demo: {
        NODE_ENV: 'demo',
        PORT: port,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: port,
      },
    },
  ],

  // DEPLOYMENT -- here we define our various deployment environments

  // todo: server public key should by assigned to github (account or by repo deploy key)
  // check https://developer.github.com/v3/guides/managing-deploy-keys/
  // test should just deploy current branch -- prod and/or demo could be automated
  deploy: {
    test: {
      user: servers.test.user,
      host: [servers.test.host],
      ref: 'origin/develop',
      repo,
      path: servers.test.server_path,
      'post-deploy':
        'npm install && pm2 startOrRestart ecosystem.config.js --env test',
    },
  },
};
