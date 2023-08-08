const http = require('http');

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
            let postParams = JSON.parse(body);
            let username = postParams.username || die();
            let Utils = require("../utils.js");
            let helper = new Utils(username);
            let token = postParams.token || die();

            if (helper.verifySession(token)) {
                let id = postParams.id || die();
                let symbol = postParams.symbol || die();
                let date = postParams.date || die();
                let type = postParams.type || die();
                let amount = postParams.amount || die();
                let fee = postParams.fee || 0;
                let notes = postParams.notes || "-";

                if (helper.validDate(date)) {
                    let activity = {
                        id: id,
                        symbol: symbol,
                        date: date,
                        time: new Date(date).getTime(),
                        type: type,
                        amount: amount,
                        fee: fee,
                        notes: notes
                    };

                    if (type === "buy" || type === "sell" || type === "transfer") {
                        if (type === "buy" || type === "sell") {
                            let exchange = postParams.exchange || "-";
                            let pair = postParams.pair || "-";
                            let price = postParams.price || die();
                            let quantity = postParams.quantity || die();

                            activity.exchange = exchange;
                            activity.pair = pair;
                            activity.price = price;
                            activity.quantity = quantity;
                        } else if (type == "transfer") {
                            let from = postParams.from || "-";
                            let to = postParams.to || "-";

                            activity.from = from;
                            activity.to = to;
                        }
                    } else {
                        console.log(JSON.stringify({ error: "Invalid activity type." }));
                    }

                    const current = JSON.parse(fs.readFileSync(helper.activityFile));

                    let txID = Date.now() + helper.getRandomHex(8);
                    while (txID in current) {
                        txID = Date.now() + helper.getRandomHex(8);
                    }

                    current.txID = activity;

                    if (Date.now() / 1000 - 1 > new Date($helper.activityFile).getTime() / 1000) {
                        var create = fs.writeFileSync($helper.activityFile, JSON.stringify(current));
                        if (create) {
                            console.log(JSON.stringify({ message: "The activity has been recorded." }));
                        } else {
                            console.log(JSON.stringify({ error: "Activity couldn't be recorded." }));
                        }
                    } else {
                        console.log(JSON.stringify({ error: "Duplicate request detected. Only the first was processed." }));
                    }
                } else {
                    console.log(JSON.stringify({ error: "Invalid date."}))
                }
            } else {
                console.log(JSON.stringify({ error: "You need to be logged in to do that."}))
            }
        });
    } else {
        console.log(JSON.stringify({ error: "Wrong request method. Please use POST."}))
    }
}).listen(8080);
