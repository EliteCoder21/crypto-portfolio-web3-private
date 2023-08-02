const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Content-Type", "application/json");

    if (req.method === "POST") {
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
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
                let current = JSON.parse(fs.readFileSync(helper.activityFile));

                for (let i = 0; i < rows.length; i++) {
                    let data = rows[i].split(",");
                    let txID = data[0] || (valid = false);
                    if (txID === "-") {
                        txID = Date.now().toString() + helper.getRandomHex(8);
                        while (current.hasOwnProperty(txID)) {
                            txID = Date.now().toString() + helper.getRandomHex(8);
                        }
                    }
                    let id = data[1] || (valid = false);
                    let symbol = data[2] || (valid = false);
                    let date = data[3].replace(/'/g, "").replace(/"/g, "") || (valid = false);
                    let type = data[4].toLowerCase() || (valid = false);
                    let amount = data[5] || (valid = false);
                    let fee = data[6] || 0;
                    let notes = data[7].replace(/"/g, "") || "";

                    // Rest of the code
                }
            }
        });
    }
}).listen(8080);
