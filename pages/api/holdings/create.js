const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Content-Type", "application/json");

    if (req.method === "POST") {
        let body = "";
        req.on("data", function (data) {
            body += data;
        });

        req.on("end", function () {
            let postData = JSON.parse(body);
            let username = postData.username || die();
            let utils = require("../utils.js");
            let helper = new utils.Utils(username);
            let token = postData.token || die();

            if (helper.verifySession(token)) {
                let id = postData.id || die();
                let symbol = postData.symbol || die();
                let amount = postData.amount || die();
                let current = JSON.parse(fs.readFileSync(helper.holdingsFile));

                if (current.hasOwnProperty(id)) {
                    current[id].amount += amount;
                } else {
                    current[id] = { symbol: symbol, amount: amount };
                }

                if (Date.now() - 1000 > fs.statSync(helper.holdingsFile).mtimeMs) {
                    fs.writeFileSync(helper.holdingsFile, JSON.stringify(current));
                    res.end(JSON.stringify({ message: "The asset has been created." }));
                } else {
                    res.end(JSON.stringify({ error: "Duplicate request detected. Only the first was processed." }));
                }
            } else {
                res.end(JSON.stringify({ error: "Invalid session token." }));
            }
        });
    } else {
        res.end(JSON.stringify({ error: "Invalid request method." }));
    }
}).listen(8080);
