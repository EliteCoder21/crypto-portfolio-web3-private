import Navbar from "../components/navbar.js";
import { useEffect, useState } from "react";
import { useAuthContext } from "../firebase/context.js";
import Login from "../components/login.js";
import { separateThousands } from "../assets/string.js";
import { getAllCoins, getMarketCap } from "../assets/coindesk.js";

const INITIAL_STATE = [
  {
    rank: 1,
    image: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
    coin: "BTC",
    price: 29307,
    marketCap: 570074511326,
    change: -0.31,
  },
];

export default function Market() {
  const [globalMarketCap, setGlobalMarketCap] = useState();
  const [globalVolume, setGlobalVolume] = useState();
  const [globalDominance, setGlobalDominance] = useState();
  const [marketData, setMarketData] = useState(INITIAL_STATE);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchGlobalData() {
      const marketData = await getMarketCap();

      setGlobalMarketCap(marketData.marketCap);
      setGlobalVolume(marketData.totalVolume);
      setGlobalDominance(marketData.btcDominance);
    }

    async function fetchCoinData() {
      const newMarketData = await getAllCoins();
      setMarketData(newMarketData);
    }

    fetchGlobalData();
    fetchCoinData();
  }, []);

  const renderLogs = () => {
    return marketData.map(({ rank, image, coin, price, marketCap, change }) => {
      return (
        <div className="market-list loading" id="market-list" data-page={1}>
          <div className="coin-wrapper loading">
            <tr>
              <span className="rank" data-item="rank">
                {rank}
              </span>
              <span className="coin" data-item="coin">
                <img draggable="false" src={image} />
                {coin}
              </span>
              <span className="price" data-item="price">
                {price}
              </span>
              <span className="market-cap" data-item="market-cap">
                {marketCap}
              </span>
              <span className="change" data-item="change">
                {change}
              </span>
            </tr>
          </div>
        </div>
      );
    });
  };

  const renderTable = () => {
    return (
      <div>
        <div className="market-list-wrapper noselect">
          <div className="headers-wrapper" data-list="dashboardMarket">
            <span className="header rank" data-item="rank">#</span>
            <span className="header coin" data-item="coin">Coin</span>
            <span className="header price" data-item="price">Price</span>
            <span className="header market-cap" data-item="market-cap">Market Cap</span>
            <span className="header change" data-item="change">24h Change</span>
          </div>
        </div>
        {renderLogs()}
      </div>
    );
  };

  return (
    <div>
      {user ? (
        <div>
          <Navbar active="/market" />
          <div className="page market active" id="page-market">
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
              Market
            </h1>
            <div
              className="stats-wrapper noselect"
              style={{ marginBottom: 20 }}
            >
              <div className="stats-card market-cap">
                <span className="stats-title title">Market Cap</span>
                <span
                  className="stats-subtitle subtitle"
                  id="global-market-cap"
                >
                  ${globalMarketCap}
                </span>
              </div>
              <div className="stats-card volume">
                <span className="stats-title title">24h Volume</span>
                <span className="stats-subtitle subtitle" id="global-volume">
                  ${globalVolume}
                </span>
              </div>
              <div className="stats-card dominance">
                <span className="stats-title title">BTC Dominance</span>
                <span className="stats-subtitle subtitle" id="global-dominance">
                  {globalDominance}%
                </span>
              </div>
            </div>
            <div
              className="page-navigation-wrapper noselect"
              id="page-navigation"
            >
              <div className="previous" id="previous-page">
                <svg
                  width={1792}
                  height={1792}
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
                </svg>
              </div>
              <div className="number">
                <span id="page-number">Page 1</span>
              </div>
              <div className="next" id="next-page">
                <svg
                  width={1792}
                  height={1792}
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
                </svg>
              </div>
            </div>
            <div
              className="market-list-wrapper noselect"
              style={{ marginBottom: 20 }}
            >

              {renderTable()}
            
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
