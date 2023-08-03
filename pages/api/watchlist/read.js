const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET") {
        const query = url.parse(req.url, true).query;
        const username = query.username || die();
        const utils = require("../utils.js");
        const helper = new utils.Utils(username);
        const token = query.token || die();

        if (helper.verifySession(token)) {
            fs.readFile(helper.watchlistFile, function (err, data) {
                if (err) {
                    console.log(err);
                    res.end();
                } else {
                    res.write(data);
                    res.end();
                }
            });
        } else {
            res.write(JSON.stringify({ "error": "You need to be logged in to do that." }));
            res.end();
        }
    } else {
        res.write(JSON.stringify({ "error": "Wrong request method. Please use GET." }));
        res.end();
    }
}).listen(8080);
