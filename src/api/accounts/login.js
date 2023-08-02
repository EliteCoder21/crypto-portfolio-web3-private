const http = require('http');

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST') {
        let body = '';
        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            let postData = JSON.parse(body);
            let username = postData.username || die();
            let Utils = require('../utils.js');
            let helper = new Utils(username);
            helper.fetchCoins();

            if (postData.token) {
                if (helper.verifySession(postData.token)) {
                    res.end(JSON.stringify({ message: 'You are now being logged in...', valid: true, username: helper.username }));
                } else {
                    res.end(JSON.stringify({ error: 'Invalid account.', valid: false }));
                }
            } else {
                let platform = 'web';
                let password = postData.password || die();
                if (helper.verifyPassword(password)) {
                    let token = helper.generateToken(platform);
                    res.end(JSON.stringify({ message: 'You are now being logged in...', token: token, valid: true, username: helper.username }));
                } else {
                    res.end(JSON.stringify({ error: 'Invalid password.', valid: false }));
                }
            }
        });
    } else {
        res.end(JSON.stringify({ error: 'Wrong request method. Please use POST.' }));
    }
}).listen(8080);
