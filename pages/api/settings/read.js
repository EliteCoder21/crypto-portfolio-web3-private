const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const username = url.searchParams.get('username');
    const token = url.searchParams.get('token');

    if (!username || !token) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Bad Request' }));
      return;
    }

    const utils = require('../utils.js');
    const helper = new utils.Utils(username);

    if (helper.verifySession(token)) {
      fs.readFile(helper.settingsFile, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: 'You need to be logged in to do that.' }));
    }
  } else {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }
}).listen(3000);
