import Utils from '../utils.js'

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "DELETE") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const input = JSON.parse(body);
      const username = input.username || die();
      const account = input.account || die();
      //const Utils = require("../utils.js");
      const helper = new Utils(username);
      const token = input.token || die();

      if (helper.verifySession(token)) {
        if (helper.username === "admin") {
          if (account.trim().toLowerCase() !== "admin") {
            helper.rrmdir("../data/users/" + account);
            const deleteAccount = !fs.existsSync("../data/users/" + account);
            if (deleteAccount) {
              res.end(JSON.stringify({ message: "The account has been deleted." }));
            } else {
              res.end(JSON.stringify({ error: "Account couldn't be deleted." }));
            }
          } else {
            res.end(JSON.stringify({ error: "The admin account cannot be deleted." }));
          }
        } else {
          res.end(JSON.stringify({ error: "Only the admin can do that." }));
        }
      } else {
        res.end(JSON.stringify({ error: "You need to be logged in to do that." }));
      }
    });
  } else {
    res.end(JSON.stringify({ error: "Wrong request method. Please use DELETE." }));
  }
}).listen(3000);
