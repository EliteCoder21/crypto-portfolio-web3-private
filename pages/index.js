import DomainIcon from "@mui/icons-material/Domain";
import LaunchIcon from "@mui/icons-material/Launch";
import BarChartIcon from "@mui/icons-material/BarChart";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import Navbar from "../components/navbar.js";
import { useEffect, useState } from "react";
import { useAuthContext } from '../firebase/context.js';
import Login from "../components/login.js";
import { getUserHoldings } from "../firebase/user.js";

export default function InstructionsComponent() {
  const [marketCap, setMarketCap] = useState();
  const [marketChange, setMarketChange] = useState();
  const [totalValue, setTotalValue] = useState();
  const [holdingsDic, setHoldings] = useState([]);
  const { user } = useAuthContext();

  function empty(value) {
    if (typeof value === "object" && value !== null && Object.keys(value).length === 0) {
      return true;
    }
    if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
      return true;
    }
    return false;
  }

  function separateThousands(number) {
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  async function calculateTotalValue() {
    let globalTotalValue = 0;
    let holdings = [];

    let coins = await getUserHoldings(user.uid);
    let list = Object.keys(coins).join("%2C");

    const req = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + "btc" + "&ids=" + list + "&order=market_cap_desc&per_page=250&page=1&sparkline=false");
    const response = await req.json();

    Object.keys(response).map(index => {
      let coin = response[index];
      let id = coin.id;
      let price = coin.current_price;
      let amount = coins[id].amount;
      let value = price * amount;
      let priceChangeDay = coin.price_change_percentage_24h;

      if(!empty(priceChangeDay)) {
        priceChangeDay = priceChangeDay.toFixed(2);
      } else {
        priceChangeDay = "-";
      }

      holdings.push({
        symbol: coins[id].symbol,
        amount: amount,
        value: value,
        price: price,
        change: priceChangeDay,
        image: coin.image
      });

      globalTotalValue += value;
      setHoldings(holdingsDic);
    });

    return globalTotalValue;
  }

  useEffect(() => {
    async function fetchGlobalData() {
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      const global = await response.json();
      const totalVal = await calculateTotalValue();

      setMarketCap(separateThousands((global.data.total_market_cap["usd"]).toFixed(0)));
      setMarketChange((global.data.market_cap_change_percentage_24h_usd).toFixed(1));
      setTotalValue(separateThousands(totalVal.toFixed(2)));
    }

    fetchGlobalData();
  }, []);

  return (
    <div>
      { user ?
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
                <div>
                  <div className="dashboard-market-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="dashboardMarket">
                      <span className="header coin" data-item="coin">
                        Coin
                      </span>
                      <span className="header price" data-item="price">
                        Price
                      </span>
                      <span className="header market-cap" data-item="marketCap">
                        Market Cap
                      </span>
                      <span className="header day" data-item="change">
                        24h Change
                      </span>
                    </div>
                    <div
                      className="dashboard-market-list loading"
                      id="dashboard-market-list"
                    >
                      <div className="coin-wrapper loading">
                        <span>Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div />
                <div>
                  <div className="dashboard-holdings-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="dashboardHoldings">
                      <span className="header coin" data-item="coin">
                        Coin
                      </span>
                      <span className="header amount" data-item="amount">
                        Amount
                      </span>
                      <span className="header value" data-item="value">
                        Value
                      </span>
                      <span className="header day" data-item="change">
                        24h Change
                      </span>
                    </div>
                    <div
                      className="dashboard-holdings-list loading"
                      id="dashboard-holdings-list"
                    >
                      {holdingsDic.map((data) => (
                        <div className="coin-wrapper loading">
                          <span className="coin">{data.coin}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : 
        <Login />
      }
    </div>
  );
}
