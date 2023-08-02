const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const input = JSON.parse(body);
      const username = input.username || die();
      const Utils = require('../utils.js');
      const helper = new Utils(username);
      const token = input.token || die();

      if (helper.verifySession(token)) {
        const txID = input.txID || die();
        const id = input.id || die();
        const symbol = input.symbol || die();
        const date = input.date || die();
        const type = input.type || die();
        const amount = input.amount || die();
        const fee = input.fee || 0;
        const notes = input.notes || '-';

        if (helper.validDate(date)) {
          const activity = {
            id: id,
            symbol: symbol,
            date: date,
            time: Date.parse(date),
            type: type,
            amount: amount,
            fee: fee,
            notes: notes
          };

          if (type === 'buy' || type === 'sell' || type === 'transfer') {
            if (type === 'buy' || type === 'sell') {
              const exchange = input.exchange || '-';
              const pair = input.pair || '-';
              const price = input.price || '-';
              const quantity = input.quantity || '-';
              const total = input.total || '-';
              const feeCurrency = input.feeCurrency || '-';
              const feeAmount = input.feeAmount || '-';
              const feeTotal = input.feeTotal || '-';

              const trade = {
                exchange: exchange,
                pair: pair,
                price: price,
                quantity: quantity,
                total: total,
                feeCurrency: feeCurrency,
                feeAmount: feeAmount,
                feeTotal: feeTotal
              };

              activity.trade = trade;
            }

            // Process the activity
            // ...
          }
        }
      }
    });
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
