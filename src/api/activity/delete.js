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
        const txID = input.txID || die();
        const current = JSON.parse(fs.readFileSync(helper.activityFile, 'utf8'));
        delete current[txID];
        const deleteResult = fs.writeFileSync(helper.activityFile, JSON.stringify(current));

        if (deleteResult) {
          res.end(JSON.stringify({ message: 'The activity has been deleted.' }));
        } else {
          res.end(JSON.stringify({ error: 'Activity couldn\'t be deleted.' }));
        }
      } else {
        res.end(JSON.stringify({ error: 'You need to be logged in to do that.' }));
      }
    });
  } else {
    res.end(JSON.stringify({ error: 'Wrong request method. Please use DELETE.' }));
  }
}).listen(8080);
