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
            res.end();
            return;
        }

        const utils = require("../utils.js");
        const helper = new utils.Utils(username);
        const token = url.searchParams.get("token");
        if (!token) {
            res.statusCode = 400;
            res.end();
            return;
        }

        if (helper.verifySession(token)) {
            const current = JSON.parse(fs.readFileSync(helper.activityFile, "utf8"));
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
            res.setHeader("Content-Disposition", `attachment; filename=Activity-${Date.now()}.csv`);

            const output = fs.createWriteStream("output.csv");
            output.write("txID,id,symbol,date,type,amount,fee,notes,exchange,pair,price,from,to\n");
            const txIDs = Object.keys(current);
            for (let i = 0; i < txIDs.length; i++) {
                output.write(`${txIDs[i]},${current[txIDs[i]].id},${current[txIDs[i]].symbol.toUpperCase()},${current[txIDs[i]].date},${current[txIDs[i]].type.charAt(0).toUpperCase() + current[txIDs[i]].type.slice(1)},${current[txIDs[i]].amount},${current[txIDs[i]].fee},${current[txIDs[i]].notes},${current[txIDs[i]].exchange},${current[txIDs[i]].pair.toUpperCase()},${current[txIDs[i]].price},${current[txIDs[i]].from},${current[txIDs[i]].to}\n`);
            }
            output.end();
            output.on("finish", function () {
                fs.readFile("output.csv", function (err, data) {
                    if (err) {
                        res.statusCode = 500;
                        res.end();
                        return;
                    }
                    res.end(data);
                });
            });
        } else {
            res.statusCode = 401;
            res.end(JSON.stringify({ "error": "You need to be authenticated" }));
        }
    } else {
        res.statusCode = 405;
        res.end();
    }
}).listen(8080);
