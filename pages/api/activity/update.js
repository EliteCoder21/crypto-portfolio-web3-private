const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'PUT') {
        const input = JSON.parse(file_get_contents("php://input"));
        const username = input.username;
        const utils = require("../utils.js");
        const helper = new utils.Utils(username);
    
        const token = input.token;
        if (helper.verifySession(token)) {
            const txID = input.txID;
            const id = input.id;
            const symbol = input.symbol;
            const date = input.date;
            const type = input.type;
            const amount = input.amount;
            const fee = input.fee;
            const notes = input.notes;
    
            if (helper.validDate(date)) {
                const activity = {
                  id: id,
                  symbol: symbol,
                  date: date,
                  time: strtotime(date),
                  type: type,
                  amount: amount,
                  fee: fee,
                  notes: notes,
                };
      
              if (type === "buy" || type === "sell" || type === "transfer") {
                  if (type === "buy" || type === "sell") {
                    const exchange = input.exchange;
                    const pair = input.pair;
                    const price = input.price;
        
                    activity.exchange = exchange;
                    activity.pair = pair;
                    activity.price = price;
                  } else if (type === "transfer") {
                    const from = input.from;
                    const to = input.to;
        
                    activity.from = from;
                    activity.to = to;
                  }
                } else {
                  console.log(JSON.stringify({ error: "Invalid activity type." }));
                }
      
              const current = JSON.parse(file_get_contents(helper.activityFile));
      
              if (Object.keys(current).includes(txID)) {
                current[txID] = activity;
      
                if (time() - 1 > filemtime(helper.activityFile)) {
                  const update = file_put_contents(helper.activityFile, JSON.stringify(current));
      
                  if (update) {
                    console.log(JSON.stringify({ message: "The activity has been updated." }));
                  } else {
                    console.log(JSON.stringify({ error: "Activity couldn't be updated." }));
                  }
                } else {
                  console.log(JSON.stringify({error: "Duplicate request detected. Only the first was processed." }));
                }
              } else {
                console.log(JSON.stringify({error: "Activity not found."}));
              }
            } else {
              console.log(JSON.stringify({ error: "Invalid date." }));
            }
          } else {
            console.log(JSON.stringify({ error: "You need to be logged in to do that." }));
          }
    } else {
      console.log(JSON.stringify({ error: "Wrong request method. Please use PUT." }))
    }
}).listen(8080);
