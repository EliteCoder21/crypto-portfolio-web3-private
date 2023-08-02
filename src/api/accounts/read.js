const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    const queryObject = url.parse(req.url, true).query;
    const username = queryObject.username || die();
    const utils = require('../utils.js');
    const helper = new utils.Utils(username);
    const token = queryObject.token || die();

    if (helper.verifySession(token)) {
      const fs = require('fs');
      fs.readFile(helper.accountFile, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end();
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify({ error: 'You need to be logged in to do that.' }));
    }
  } else {
    res.statusCode = 200;
    res.end(JSON.stringify({ error: 'Wrong request method. Please use GET.' }));
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
