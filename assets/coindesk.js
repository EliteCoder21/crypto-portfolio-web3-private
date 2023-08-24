import { separateThousands } from "./string";

export async function getMarketCap() {
  const response = await fetch("https://api.coingecko.com/api/v3/global");
  const global = await response.json();

  return {
    marketCap: separateThousands(
      global.data.total_market_cap["usd"].toFixed(0)
    ),
    marketChange: global.data.market_cap_change_percentage_24h_usd.toFixed(1),
    totalVolume: separateThousands(global.data.total_volume["usd"].toFixed(0)),
    btcDominance: global.data.market_cap_percentage.btc.toFixed(1),
  };
}

export async function getMarketList(currency, watchListString) {
  let req = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
      currency +
      "&ids=" +
      watchListString +
      "&order=market_cap_desc&per_page=250&page=1&sparkline=false"
  );
  let coins = await req.json();

  let marketList = [];

  Object.keys(coins).map((key) => {
    let coin = coins[key];
    marketList.push({
      icon: coin.image,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: separateThousands(parseFloat(coin.current_price).toFixed(2)),
      marketCap: abbreviateNumber(coin.market_cap, 2),
      priceChangeDay: coin.price_change_percentage_24h.toFixed(2).includes("-")
        ? coin.price_change_percentage_24h.toFixed(2)
        : "+" + coin.price_change_percentage_24h.toFixed(2),
    });
  });

  return marketList;
}

export async function getHoldingsWithValue(currency, list, coins) {
  let globalTotalValue = 0;
  let holdings = [];
  const req = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
      currency +
      "&ids=" +
      list +
      "&order=market_cap_desc&per_page=250&page=1&sparkline=false"
  );
  const response = await req.json();

  Object.keys(response).map((index) => {
    let coin = response[index];
    let id = coin.id;
    let price = coin.current_price;
    let amount = coins[id].amount;
    let value = price * amount;
    let priceChangeDay = coin.price_change_percentage_24h;

    if (!empty(priceChangeDay)) {
      priceChangeDay = priceChangeDay.toFixed(2);
    } else {
      priceChangeDay = "-";
    }

    holdings.push({
      symbol: coins[id].symbol.toUpperCase(),
      amount: amount,
      value: value,
      price: price,
      change: priceChangeDay,
      image: coin.image,
    });

    globalTotalValue += value;
  });

  return {
    holdings: holdings,
    totalValue: separateThousands(globalTotalValue.toFixed(0)),
  };
}

export async function getAllCoins() {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/");
  const coins = await response.json();
  const newMarketData = [];

  for (let coin of coins) {
    newMarketData.push({
      rank: coin.market_data.market_cap_rank,
      image: coin.image.thumb,
      coin: " " + coin.symbol.toUpperCase(),
      price: "$" + separateThousands(coin.market_data.current_price["usd"]),
      marketCap: "$" + separateThousands(coin.market_data.market_cap["usd"]),
      change: coin.market_data.price_change_percentage_24h.toFixed(2) + "%",
    });

    if (newMarketData[newMarketData.length - 1].change.toString()[0] != "-") {
      newMarketData[newMarketData.length - 1].change =
        "+" + newMarketData[newMarketData.length - 1].change;
    }
  }

  return newMarketData;
}
