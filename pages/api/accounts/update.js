const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const input = JSON.parse(body);
      const username = input.username || die();
      const Utils = require('../utils.js');
      const helper = new Utils(username);
      const currentPassword = input.currentPassword || die();
      const newPassword = input.newPassword || die();

      if (helper.verifyPassword(currentPassword)) {
        const current = JSON.parse(fs.readFileSync(helper.accountFile));
        current.password = bcrypt.hashSync(newPassword, 10);
        fs.writeFileSync(helper.accountFile, JSON.stringify(current));

        helper.generateToken('web');
        helper.generateToken('app');
        helper.generateToken('desktop');

        res.end(JSON.stringify({ message: 'Account password has been changed.' }));
      } else {
        res.end(JSON.stringify({ error: 'Invalid password.', valid: false }));
      }
    });
  } else {
    res.end(JSON.stringify({ error: 'Wrong request method. Please use PUT.' }));
  }
}).listen(3000);
