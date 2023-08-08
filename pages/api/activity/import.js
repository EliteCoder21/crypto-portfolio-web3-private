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

                    if (helper.validDate(date)) {
                        let activity = {
                            id: id,
                            symbol: symbol,
                            date: date,
                            time: Date.parse(date),
                            type: type,
                            amount: amount,
                            fee: fee,
                            notes: notes
                        };
                        if (type == "buy" || type == "sell" || type == "transfer") {
                            if (type == "buy" || type == "sell") {
                                let exchange = data[8] ? data[8].replace('"', "") : "-";
                                let pair = data[9] ? data[9].replace('"', "") : "-";
                                let price = data[10] ? data[10] : 0;
                                activity.exchange = exchange;
                                activity.pair = pair;
                                activity.price = price;
                            } else if (type == "transfer") {
                                let from = data[11] ? data[11].replace('"', "") : "-";
                                let to = data[12] ? data[12].replace('"', "") : "-";
                                activity.from = from;
                                activity.to = to;
                            }
                            current[txID] = activity;
                        } else {
                            console.log(JSON.stringify({ error: "Invalid activity type." }));
                            return;
                            }
                      } else {
                            let valid = false;
                            console.log(JSON.stringify({ error: "Invalid date." }));
                            return;
                      }
                }

                if (valid) {
                    const _import = fs.writeFileSync(helper.activityFile, JSON.stringify(current));

                    if (_import) {
                      console.log(JSON.stringify({ message: "The activities have been recorded." }));
                    } else {
                      console.log(JSON.stringify({ error: "Activities couldn't be recorded." }));
                    }
                  } else {
                    console.log(JSON.stringify({ error: "Invalid content format." }));
                  }
            } else {
                console.log(JSON.stringify({ error: "You need to be logged in to do that."}))
            }
        });
    } else {
        console.log(JSON.stringify({ error: "Wrong request method. Please use POST." }))
    }
}).listen(8080);
