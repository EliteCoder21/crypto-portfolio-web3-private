const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        const queryObject = url.parse(req.url, true).query;
        const username = queryObject.username || die();
        const utils = require('../utils.js');
        const helper = new utils.Utils(username);
        const token = queryObject.token || die();

        if (helper.verifySession(token)) {
            helper.fetchCoins();
            const coins = JSON.parse(fs.readFileSync(helper.coinsFile, 'utf8'));

            if ((!queryObject.symbol && !queryObject.id) || (queryObject.symbol && queryObject.id)) {
                die();
            } else if (queryObject.symbol) {
                findBySymbol(coins, queryObject.symbol, true);
            } else if (queryObject.id) {
                findByID(coins, queryObject.id, true);
            }
        } else {
            res.end(JSON.stringify({ "error": "You need to be logged in to do that." }));
        }
    } else {
        res.end(JSON.stringify({ "error": "Wrong request method. Please use GET." }));
    }
}).listen(8080);

function findBySymbol(coins, symbol, retry) {
    const matches = [];
    coins.forEach(function (coin) {
        if (Object.keys(coin)[0] === symbol) {
            matches.push(coin);
        }
    });

    if (matches.length === 1) {
        res.end(JSON.stringify({ "id": matches[0][symbol], "symbol": symbol }));
    } else if (matches.length === 0) {
        if (retry) {
            findByID(coins, symbol, false);
        } else {
            res.end(JSON.stringify({ "error": "No coins were found" }));
        }
    }
}

function findByID(coins, id, retry) {
    const matches = [];
    coins.forEach(function (coin) {
        if (Object.values(coin)[0] === id) {
            matches.push(coin);
        }
    });

    if (matches.length === 1) {
        res.end(JSON.stringify({ "id": id, "symbol": Object.keys(matches[0])[0] }));
    } else if (matches.length === 0) {
        if (retry) {
            findBySymbol(coins, id, false);
        } else {
            res.end(JSON.stringify({ "error": "No coins were found" }));
        }
    }
}
