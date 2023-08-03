const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Content-Type", "application/json");

    if (req.method === "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const input = JSON.parse(body);
            const username = input.username || die();
            const Utils = require("../utils.js");
            const helper = new Utils(username);
            const token = input.token || die();

            if (helper.verifySession(token)) {
                const key = input.key || die();
                const value = input.value;
                const current = JSON.parse(fs.readFileSync(helper.settingsFile));
                
                if (key in current) {
                    current[key] = value;
                    fs.writeFileSync(helper.settingsFile, JSON.stringify(current));
                    res.end(JSON.stringify({ message: "The setting has been updated." }));
                } else {
                    res.end(JSON.stringify({ error: "Setting not found." }));
                }
            } else {
                res.end(JSON.stringify({ error: "You need to be logged in to do that." }));
            }
        });
    } else {
        res.end(JSON.stringify({ error: "Wrong request method. Please use PUT." }));
    }
}).listen(8080);
