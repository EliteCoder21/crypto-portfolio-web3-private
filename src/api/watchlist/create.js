const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Content-Type", "application/json");

    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            let postData = {};
            if (req.headers["content-type"] === "application/json") {
                postData = JSON.parse(body);
            } else {
                postData = require("querystring").parse(body);
            }

            const username = postData.username || die();
            const Utils = require("../utils.js");
            const helper = new Utils(username);
            const token = postData.token || die();

            if (helper.verifySession(token)) {
                const id = postData.id || die();
                const symbol = postData.symbol || die();
                const current = JSON.parse(fs.readFileSync(helper.watchlistFile, "utf8"));
                current[id] = { symbol: symbol };

                if (Date.now() - 1000 > fs.statSync(helper.watchlistFile).mtimeMs) {
                    fs.writeFile(helper.watchlistFile, JSON.stringify(current), (err) => {
                        if (err) {
                            res.end(JSON.stringify({ error: "Asset couldn't be added to watchlist." }));
                        } else {
                            res.end(JSON.stringify({ message: "Asset added to watchlist." }));
                        }
                    });
                } else {
                    res.end(JSON.stringify({ error: "Duplicate request detected. Only the first was processed." }));
                }
            } else {
                res.end(JSON.stringify({ error: "You need to be logged in to do that." }));
            }
        });
    } else {
        res.end(JSON.stringify({ error: "Wrong request method. Please use POST." }));
    }
}).listen(8080);
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Content-Type", "application/json");

    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            let postData = {};
            if (req.headers["content-type"] === "application/json") {
                postData = JSON.parse(body);
            } else {
                postData = require("querystring").parse(body);
            }

            const username = postData.username || die();
            const Utils = require("../utils.js");
            const helper = new Utils(username);
            const token = postData.token || die();

            if (helper.verifySession(token)) {
                const id = postData.id || die();
                const symbol = postData.symbol || die();
                const current = JSON.parse(fs.readFileSync(helper.watchlistFile, "utf8"));
                current[id] = { symbol: symbol };

                if (Date.now() - 1000 > fs.statSync(helper.watchlistFile).mtimeMs) {
                    fs.writeFile(helper.watchlistFile, JSON.stringify(current), (err) => {
                        if (err) {
                            res.end(JSON.stringify({ error: "Asset couldn't be added to watchlist." }));
                        } else {
                            res.end(JSON.stringify({ message: "Asset added to watchlist." }));
                        }
                    });
                } else {
                    res.end(JSON.stringify({ error: "Duplicate request detected. Only the first was processed." }));
                }
            } else {
                res.end(JSON.stringify({ error: "You need to be logged in to do that." }));
            }
        });
    } else {
        res.end(JSON.stringify({ error: "Wrong request method. Please use POST." }));
    }
}).listen(8080);
