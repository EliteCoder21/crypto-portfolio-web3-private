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
                let rows = postData.rows || die();
                let valid = true;
                let current = JSON.parse(fs.readFileSync(helper.holdingsFile, "utf8"));

                for (let i = 0; i < rows.length; i++) {
                    let data = rows[i].split(",");
                    let id = data[0] || (valid = false);
                    let symbol = data[1] || (valid = false);
                    let amount = data[2] || (valid = false);

                    if (current.hasOwnProperty(id)) {
                        current[id].amount += amount;
                    } else {
                        current[id] = { symbol: symbol, amount: amount };
                    }
                }

                if (valid) {
                    fs.writeFileSync(helper.holdingsFile, JSON.stringify(current));
                    res.end(JSON.stringify({ message: "The assets have been created." }));
                } else {
                    res.end(JSON.stringify({ error: "Assets couldn't be created." }));
                }
            } else {
                res.end(JSON.stringify({ error: "Invalid token." }));
            }
        });
    } else {
        res.end(JSON.stringify({ error: "Invalid request method." }));
    }
}).listen(8080);
