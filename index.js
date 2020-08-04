const express = require('express');
const path = require('path');

const app = express();

// serve frontend for non-api calls
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const root = path.join(__dirname);
  return res.sendFile('index.html', { root });
});

// else proxy to backend

const port = process.env.PORT || 3333;
app.listen(port);
