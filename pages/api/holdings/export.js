const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET") {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const username = url.searchParams.get("username");
        if (!username) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Username parameter is missing." }));
            return;
        }

        const utils = require("../utils.js");
        const helper = new utils(username);
        const token = url.searchParams.get("token");
        if (!token) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Token parameter is missing." }));
            return;
        }

        if (helper.verifySession(token)) {
            const current = JSON.parse(fs.readFileSync(helper.holdingsFile, "utf8"));
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
            res.setHeader("Content-Disposition", `attachment; filename=Holdings-${Date.now()}.csv`);

            const output = fs.createWriteStream("holdings.csv");
            output.write("id,symbol,amount\n");
            const ids = Object.keys(current);
            for (let i = 0; i < ids.length; i++) {
                output.write(`${ids[i]},${current[ids[i]].symbol},${current[ids[i]].amount}\n`);
            }
            output.end();

            output.on("finish", function () {
                fs.createReadStream("holdings.csv").pipe(res);
            });
        } else {
            res.statusCode = 401;
            res.end(JSON.stringify({ error: "You need to be logged in to do that." }));
        }
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Wrong request method. Please use GET." }));
    }
}).listen(8080);
