import Utils from '../utils.js'

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
            let post = JSON.parse(body);
            let username = post.username || die();
            let account = post.account || die();
            //let utils = require("/~1/pages/api/utils.js");
            let helper = new Utils(username);
            let token = post.token || die();

            if (helper.verifySession(token)) {
                if (helper.username === "admin") {
                    if (helper.validUsername(account)) {
                        if (!fs.existsSync("../data/users/")) {
                            fs.mkdirSync("../data/users/");
                        }
                        if (!helper.userExists(account)) {
                            fs.mkdirSync("../data/users/" + account);
                        }
                        let accountHelper = new utils.Utils(account);
                        let content = fs.readFileSync(accountHelper.accountFile, "utf8");
                        let current = JSON.parse(content);

                        if (!fs.existsSync(accountHelper.accountFile) || !current.hasOwnProperty("password") || content === "") {
                            let password = bcrypt.hashSync(account, 10);
                            let accountData = JSON.stringify({
                                username: account,
                                password: password,
                                web: accountHelper.generateToken("web"),
                                app: accountHelper.generateToken("app"),
                                desktop: accountHelper.generateToken("desktop")
                            });
                            fs.writeFileSync(accountHelper.accountFile, accountData);
                        }
                    }
                }
            }
        });
    }
}).listen(8080);
