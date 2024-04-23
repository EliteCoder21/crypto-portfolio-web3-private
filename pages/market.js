import Navbar from "../components/navbar.js";
import { useEffect, useState } from "react";
import { useAuthContext } from "../firebase/context.js";
import Login from "../components/login.js";
import { getAllCoins, getMarketCap } from "../assets/coindesk.js";
import LiveCoinWatchWidget from "../components/watch-widget.js";

export default function Market() {
  const [globalMarketCap, setGlobalMarketCap] = useState();
  const [globalVolume, setGlobalVolume] = useState();
  const [globalDominance, setGlobalDominance] = useState();
  const [marketData, setMarketData] = useState([]);
  const [displayPopup, setDisplayPopup] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchGlobalData() {
      // Segment which is causing problems - Uniswap
      /*
      const marketData = await getMarketCap();

      setGlobalMarketCap(marketData.marketCap);
      setGlobalVolume(marketData.totalVolume);
      setGlobalDominance(marketData.btcDominance);
      */
    }

    async function fetchCoinData() {
      // Segment which is causing problems - Uniswap
      /*
      const newMarketData = await getAllCoins();
      setMarketData(newMarketData);
      */
    }

    fetchGlobalData();
    fetchCoinData();
  }, []);

  const renderLogs = () => {
    return marketData.map(({ rank, image, coin, price, marketCap, change }) => {
      return (
        <tr className="coin-wrapper">
          <td>
            {rank}
            <span>
              <button
                className="deleteElement"
                onClick={(e) => {
                  e.preventDefault();
                  setDisplayPopup(coin);
                }}
              >
                ↗
              </button>
            </span>
          </td>
          <td>
            <img draggable="false" src={image} />
            {coin}
          </td>
          <td>{price}</td>
          <td>{marketCap}</td>
          <td style = {{color: change[0] != "-" ? "green" : "red",}}>{change}</td>
        </tr>
      );
    });
  };

  const renderTable = () => {
    return (
      <table className="dashboard-market-list-wrapper noselect">
        <tr className="headers-wrapper" data-list="dashboardMarket">
          <th>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>24h Change</th>
        </tr>
        {renderLogs()}
      </table>
    );
  };

  return (
    <div>
      {user ? (
        <div>
          <Navbar active="/market" />
          <div className="page market active" id="page-market">
            {displayPopup ? (
              <div
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="popup-wrapper active"
                  style={{ width: 400, height: 400 }}
                >
                  <div className="top">
                    <span className="title">Market Data</span>
                  </div>

                  <div className="bottom">
                    <LiveCoinWatchWidget coin={displayPopup.trim()} />
                    <button
                      style={{ marginTop: 20 }}
                      class="reject"
                      id="popup-cancel"
                      onClick={() => {
                        setDisplayPopup(null);
                      }}
                    >
                      Exit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
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
              className="holdings-list-wrapper noselect"
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
