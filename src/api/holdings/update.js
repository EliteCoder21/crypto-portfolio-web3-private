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
        const id = input.id || die();
        const amount = input.amount || die();
        const current = JSON.parse(fs.readFileSync(helper.holdingsFile, "utf8"));

        if (current.hasOwnProperty(id)) {
          current[id].amount = amount;

          if (Date.now() - 1000 > fs.statSync(helper.holdingsFile).mtimeMs) {
            fs.writeFileSync(helper.holdingsFile, JSON.stringify(current));

            res.end(JSON.stringify({ message: "The asset has been updated." }));
          } else {
            res.end(JSON.stringify({ error: "Duplicate request detected. Only the first was processed." }));
          }
        } else {
          res.end(JSON.stringify({ error: "Asset not found." }));
        }
      } else {
        res.end(JSON.stringify({ error: "You need to be logged in to do that." }));
      }
    });
  } else {
    res.end(JSON.stringify({ error: "Wrong request method" }));
  }
}).listen(3000);
