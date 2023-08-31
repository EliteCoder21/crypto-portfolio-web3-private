import { abbreviateNumber, empty, separateThousands } from "./string";

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

export async function getMarketCoins(currency, marketString, holdingCoins) {
  let req = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
      currency +
      "&order=market_cap_desc&per_page=250&page=1&sparkline=false"
  );
  let response = await req.json();

  let marketList = [];
  let globalTotalValue = 0;
  let holdings = [];

  Object.keys(response).map((key) => {
    let coin = response[key];

    if (marketString.includes(coin.name.toLowerCase())) {
      marketList.push({
        icon: coin.image,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: separateThousands(parseFloat(coin.current_price).toFixed(2)),
        marketCap: abbreviateNumber(coin.market_cap, 2),
        priceChangeDay: coin.price_change_percentage_24h
          .toFixed(2)
          .includes("-")
          ? coin.price_change_percentage_24h.toFixed(2)
          : "+" + coin.price_change_percentage_24h.toFixed(2),
      });
    }

    if (coin.id in holdingCoins) {
      const value = coin.current_price * holdingCoins[coin.id].amount;

      holdings.push({
        symbol: holdingCoins[coin.id].symbol.toUpperCase(),
        amount: holdingCoins[coin.id].amount,
        value: value,
        price: coin.current_price,
        change: coin.price_change_percentage_24h.toFixed(2),
        image: coin.image,
      });

      globalTotalValue += value;
    }
  });

  return {
    marketList: marketList,
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
