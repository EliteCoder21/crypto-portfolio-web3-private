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
                        }

                        // Rest of the code...
                    }
                }
            }
        });
    }
}).listen(8080);
