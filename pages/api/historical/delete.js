const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'DELETE') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const input = JSON.parse(body);
      const username = input.username || die();
      const Utils = require('../utils.js');
      const helper = new Utils(username);
      const token = input.token || die();

      if (helper.verifySession(token)) {
        const deleteResult = helper.rrmdir('../data/historical/');

        if (deleteResult) {
          res.end(JSON.stringify({ message: 'Historical data has been deleted.' }));
        } else {
          res.end(JSON.stringify({ error: 'Historical data couldn\'t be deleted.' }));
        }
      } else {
        res.end(JSON.stringify({ error: 'You need to be logged in to do that.' }));
      }
    });
  } else {
    res.end(JSON.stringify({ error: 'Wrong request method. Please use DELETE.' }));
  }
}).listen(8080);
