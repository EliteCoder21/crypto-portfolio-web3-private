const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  const { pathname, query } = url.parse(req.url, true);

  if (req.method === 'GET') {
    const username = query.username || die();
    const Utils = require('../utils.js');
    const helper = new Utils(username);
    const platforms = ['web', 'app', 'desktop'];
    const platform = query.platform && platforms.includes(query.platform) ? query.platform : die();
    const token = query.token || die();

    if (helper.verifySession(token)) {
      helper.generateToken(platform);
      res.end(JSON.stringify({ message: 'You are now logged out.' }));
    } else {
      res.end(JSON.stringify({ error: 'You need to be logged in to do that.' }));
    }
  } else {
    res.end(JSON.stringify({ error: 'Wrong request method. Please use GET.' }));
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
