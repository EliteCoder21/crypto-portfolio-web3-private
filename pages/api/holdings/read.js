const http = require('http');
const fs = require('fs');
const url = require('url');

export default async function handler(req, res) {
    const queryObject = url.parse(req.url, true).query;
    const username = queryObject.username || die();
    const utils = require("../utils.js");
    const helper = new utils.Utils(username);
    const token = queryObject.token || die();

    if (helper.verifySession(token) || helper.verifyPIN(token)) {
        fs.readFile(helper.holdingsFile, function (err, data) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.end(data);
            }
        });
    } else {
        res.end(JSON.stringify({ "error": "You need to be logged in to do that." }));
    }
}