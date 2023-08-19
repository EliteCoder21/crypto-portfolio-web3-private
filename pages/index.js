import DomainIcon from "@mui/icons-material/Domain";
import LaunchIcon from "@mui/icons-material/Launch";
import BarChartIcon from "@mui/icons-material/BarChart";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import Navbar from "../components/navbar.js";
import { useEffect, useState } from "react";
import { useAuthContext } from "../firebase/context.js";
import Login from "../components/login.js";
import { getUserHoldings, getUserSettings } from "../firebase/user.js";

export default function InstructionsComponent() {
  const [marketCap, setMarketCap] = useState();
  const [marketChange, setMarketChange] = useState();
  const [totalValue, setTotalValue] = useState();
  const [holdingsDic, setHoldingsDic] = useState([]);
  const [marketDic, setMarketDic] = useState([]);
  const { user } = useAuthContext();

  function abbreviateNumber(num, digits) {
    let si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  function empty(value) {
    if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0
    ) {
      return true;
    }
    if (
      value === null ||
      typeof value === "undefined" ||
      value.toString().trim() === ""
    ) {
      return true;
    }
    return false;
  }

  function separateThousands(number) {
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  async function setMarketList() {
    let settings = await getUserSettings(user.uid);
    let watchListString = Object.keys(settings.watchlist).join("%2c");

    let req = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=btc&ids=" +
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
        priceChangeDay: coin.price_change_percentage_24h
          .toFixed(2)
          .includes("-")
          ? coin.price_change_percentage_24h.toFixed(2)
          : "+" + coin.price_change_percentage_24h.toFixed(2),
      });
    });

    setMarketDic(marketList);
  }

  async function calculateTotalValue() {
    let globalTotalValue = 0;
    let holdings = [];

    let coins = await getUserHoldings(user.uid);
    let list = Object.keys(coins).join("%2C");

    const req = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=btc" +
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

    setHoldingsDic(holdings);
    return globalTotalValue;
  }

  useEffect(() => {
    async function fetchGlobalData() {
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      const global = await response.json();
      const totalVal = await calculateTotalValue();
      await setMarketList();

      setMarketCap(
        separateThousands(global.data.total_market_cap["usd"].toFixed(0))
      );
      setMarketChange(
        global.data.market_cap_change_percentage_24h_usd.toFixed(1)
      );
      setTotalValue(separateThousands(totalVal.toFixed(2)));
    }

    if (user && marketDic.length == 0 && holdingsDic.length == 0) {
      fetchGlobalData();
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <Navbar active="/" />
          <div className="page dashboard active" id="page-dashboard">
            <h1
              style={{
                fontWeight: 300,
                fontSize: 40,
                color: "white",
                margin: 20,
                padding: 0,
                textAlign: "center",
              }}
            >
              Asset Inventory
            </h1>
            <div>
              <div className="container-fluid">
                <div className="card-deck-wraper">
                  <div className="card-deck d-flex flex-type justify-content-center">
                    <div style={{ width: "80%", paddingBottom: 20 }}>
                      <div className="sectionGrid">
                        <div>
                          <a className="link explore" href="assets">
                            <div className="sectionCard card">
                              <div className="card-body">
                                <span
                                  className="material-icons"
                                  style={{ fontSize: 120 }}
                                >
                                  <DomainIcon fontSize="inherit" />
                                </span>
                                <div className="launchSurround">
                                  <div className="launch">
                                    <p>Launch App</p>
                                    <i className="material-icons">
                                      <LaunchIcon />
                                    </i>
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                                <p className="css-146c3p1">RWA in Custody</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a className="link explore" href="aut">
                            <div className="sectionCard card">
                              <div className="card-body">
                                <span
                                  className="material-icons"
                                  style={{ fontSize: 120 }}
                                >
                                  <BarChartIcon fontSize="inherit" />
                                </span>
                                <div className="launchSurround">
                                  <div className="launch">
                                    <p>Launch App</p>
                                    <i className="material-icons">
                                      <LaunchIcon />
                                    </i>
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                                <p
                                  className="css-146c3p1"
                                  style={{ display: "flex" }}
                                >
                                  <span className="lg-view">
                                    Asset Unique Token
                                  </span>
                                  <span className="sm-view">AUT</span>
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a className="link explore" href="oxa">
                            <div className="sectionCard card">
                              <div className="card-body">
                                <span
                                  className="material-icons"
                                  style={{ fontSize: 120 }}
                                >
                                  <RequestQuoteIcon fontSize="inherit" />
                                </span>
                                <div className="launchSurround">
                                  <div className="launch">
                                    <p>Launch App</p>
                                    <i className="material-icons">
                                      <LaunchIcon />
                                    </i>
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                                <p
                                  className="css-146c3p1"
                                  style={{ display: "flex" }}
                                >
                                  <span className="lg-view">
                                    Stable Credit Token
                                  </span>
                                  <span className="sm-view">OXA</span>
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a className="link explore" href="holdings">
                            <div className="sectionCard card">
                              <div className="card-body">
                                <span
                                  className="material-icons"
                                  style={{ fontSize: 120 }}
                                >
                                  <AssuredWorkloadIcon fontSize="inherit" />
                                </span>
                                <div className="launchSurround">
                                  <div className="launch">
                                    <p>Launch App</p>
                                    <i className="material-icons">
                                      <LaunchIcon />
                                    </i>
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                                <p className="css-146c3p1">Digital Assets</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <div
                className="dashboard-market-card-wrapper noselect"
                style={{ marginBottom: 20 }}
              >
                <div className="dashboard-market-cap-card">
                  <span className="title">Market Cap</span>
                  <span className="subtitle" id="dashboard-market-cap">
                    ${marketCap}
                  </span>
                </div>
                <div className="dashboard-market-cap-card">
                  <span className="title">24h Change</span>
                  <span className="subtitle" id="dashboard-market-change">
                    {marketChange}%
                  </span>
                </div>
                <div className="dashboard-market-cap-card">
                  <span className="title">Total Value</span>
                  <span className="subtitle" id="dashboard-holdings-value">
                    {totalValue}
                  </span>
                </div>
              </div>
              <div className="dashboard-row">
                <div className="dashboard-span-width-set">
                  <table className="dashboard-market-list-wrapper noselect">
                    <tr className="headers-wrapper" data-list="dashboardMarket">
                      <th>Coin</th>
                      <th>Price</th>
                      <th>Market Cap</th>
                      <th>24h Change</th>
                    </tr>
                    {marketDic.map((coin) => (
                      <tr className="coin-wrapper">
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              draggable="false"
                              src={coin.icon}
                              title={coin.name}
                            />
                            <p className="coin" title={coin.name}>
                              {coin.symbol}
                            </p>
                          </div>
                        </td>
                        <td>${coin.price}</td>
                        <td>${coin.marketCap}</td>
                        <td>{coin.priceChangeDay}</td>
                      </tr>
                    ))}
                  </table>
                </div>
                <div />
                <div className="dashboard-span-width-set">
                  <table className="dashboard-market-list-wrapper noselect">
                    <tr className="headers-wrapper" data-list="dashboardMarket">
                      <th>Coin</th>
                      <th>Amount</th>
                      <th>Value</th>
                      <th>24h Change</th>
                    </tr>
                    {holdingsDic.map((coin) => (
                      <tr className="coin-wrapper">
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img draggable="false" src={coin.image} title={coin.name} />
                            <p className="coin" title={coin.name}>
                              {coin.symbol}
                            </p>
                          </div>
                        </td>
                        <td>{separateThousands(coin.amount)}</td>
                        <td>${separateThousands(coin.value)}</td>
                        <td>
                          {coin.change.includes("-")
                            ? coin.change + "%"
                            : "+" + coin.change + "%"}
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
