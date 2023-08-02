const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    const username = req.url.includes('?username=') ? req.url.split('=')[1] : null;
    if (!username) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Username parameter is missing.' }));
      return;
    }

    const token = req.url.includes('?token=') ? req.url.split('=')[2] : null;
    if (!token) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Token parameter is missing.' }));
      return;
    }

    const utils = require('../utils.js');
    const helper = new utils.Utils(username);

    if (helper.verifySession(token)) {
      if (helper.username === 'admin') {
        const files = rglob('../data/users/*account.json');
        const accounts = { accounts: [], usernames: [] };

        files.forEach((file) => {
          const content = JSON.parse(fs.readFileSync(file, 'utf8'));
          accounts.accounts.push(path.basename(path.dirname(file)));
          accounts.usernames.push(content.username);
        });

        res.statusCode = 200;
        res.end(JSON.stringify(accounts));
      } else {
        res.statusCode = 403;
        res.end(JSON.stringify({ error: 'Only the admin can do that.' }));
      }
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: 'You need to be logged in to do that.' }));
    }
  } else {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Wrong request method. Please use GET.' }));
  }
}).listen(8080);
