import LaunchIcon from "@mui/icons-material/Launch";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import Navbar from "../components/navbar.js";
import { useEffect, useState } from "react";
import { useAuthContext } from "../firebase/context.js";
import Login from "../components/login.js";
import {
  deleteWatchlist,
  getUserHoldings,
  getUserSettings,
} from "../firebase/user.js";
import { separateThousands } from "../assets/string.js";
import {
  getHoldingsWithValue,
  getMarketCap,
  getMarketList,
  getMarketCoins,
} from "../assets/coindesk.js";

export default function InstructionsComponent() {
  const [marketCap, setMarketCap] = useState();
  const [marketChange, setMarketChange] = useState();
  const [totalValue, setTotalValue] = useState();
  const [holdingsDic, setHoldingsDic] = useState([]);
  const [marketDic, setMarketDic] = useState([]);
  const { user } = useAuthContext();

  async function deleteWatchlistCoin(coin) {
    await deleteWatchlist(user.uid, coin.name.toLowerCase());
    let settings = await getUserSettings(user.uid);
    setMarketList(settings);
  }

  async function setMarketList(settings) {
    let coins = await getUserHoldings(user.uid);
    let watchListString = Object.keys(settings.watchlist).join("%2c");
    const currency = settings ? settings.currency : "usd";

    // Segment which is causing problems - Uniswap
    const data = await getMarketCoins(currency, watchListString, coins);

    setMarketDic(data.marketList);
    setHoldingsDic(data.holdings);
    setTotalValue(data.totalValue);
  }

  async function calculateMarketData() {

    // Segment which is causing problems - Uniswap
    const marketData = await getMarketCap();
    setMarketCap(marketData.marketCap);
    setMarketChange(marketData.marketChange);
    
  }

  useEffect(() => {
    async function fetchGlobalData() {
      let settings = await getUserSettings(user.uid);
      await calculateMarketData();
      await setMarketList(settings);
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
              Dashboard
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
                                  <AccountBalanceWalletIcon fontSize="inherit" />
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
                                <p className="css-146c3p1">Assets</p>
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
                                  <DataThresholdingIcon fontSize="inherit" />
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
                                <p className="css-146c3p1">Holdings</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a className="link explore" href="market">
                            <div className="sectionCard card">
                              <div className="card-body">
                                <span
                                  className="material-icons"
                                  style={{ fontSize: 120 }}
                                >
                                  <StoreIcon fontSize="inherit" />
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
                                  <span className="lg-view">Market</span>
                                  <span className="sm-view">Market</span>
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div>
                          <a className="link explore" href="activity">
                            <div className="sectionCard card">
                              <div className="card-body">
                                <span
                                  className="material-icons"
                                  style={{ fontSize: 120 }}
                                >
                                  <SwapHorizIcon fontSize="inherit" />
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
                                  <span className="lg-view">Activity</span>
                                  <span className="sm-view">Activity</span>
                                </p>
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
            <div>
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
                    ${totalValue}
                  </span>
                </div>
              </div>
              <div className="dashboard-row">
                <div className="holdings-list-wrapper noselect">
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
                            <button
                              className="deleteWatchlist"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteWatchlistCoin(coin);
                              }}
                            >
                              x
                            </button>
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
                        <td
                          style={{
                            color: coin.priceChangeDay >= 0 ? "green" : "red",
                          }}
                        >
                          {coin.priceChangeDay}%
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
                <div className="holdings-list-wrapper noselect">
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
                            <img
                              draggable="false"
                              src={coin.image}
                              title={coin.name}
                            />
                            <p className="coin" title={coin.name}>
                              {coin.symbol}
                            </p>
                          </div>
                        </td>
                        <td>{separateThousands(coin.amount)}</td>
                        <td>${separateThousands(coin.value)}</td>
                        <td
                          style={{
                            color: coin.change >= 0 ? "green" : "red",
                          }}
                        >
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
