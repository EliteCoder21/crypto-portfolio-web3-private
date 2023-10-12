import Navbar from "../components/navbar.js";
import { useState, useEffect } from "react";
import { useAuthContext } from "../firebase/context";
import Login from "../components/login.js";
import {
  addUserHoldings,
  getUserHoldings,
  deleteUserHoldings,
  getUserSettings,
} from "../firebase/user.js";
import cryptocurrency from "../assets/crypto.js";
import { getMarketCoins } from "../assets/coindesk.js";
import { separateThousands } from "../assets/string.js";

export default function Holdings() {
  const [displayPopup, setDisplayPopup] = useState(false);
  const [coinSymbol, setCoinSymbol] = useState("");
  const [amount, setAmount] = useState(0);
  const [edit, setEdit] = useState(null);
  const { user } = useAuthContext();
  const [totalValue, setTotalValue] = useState(0);
  const [holdingsDic, setHoldingsDic] = useState([]);
  const [settings, setSettings] = useState();

  async function fetchTotalValue() {
    let coins = await getUserHoldings(user.uid);
    const currency = settings ? settings.currency : "usd";

    const data = await getMarketCoins(currency, "", coins);

    setHoldingsDic(data.holdings);
    setTotalValue(data.totalValue);
  }

  function onSubmitAddHolding(e) {
    try {
      e.preventDefault();
      editHoldings(coinSymbol);
    } catch (e) {
      alert("Not a valid coin symbol");
    }
  }

  async function editHoldings(coinSym, newAmount) {
    let data = {};
    data[cryptocurrency[coinSym.toUpperCase()]] = {
      amount: amount,
      symbol: coinSym.toUpperCase(),
    };
    
    setEdit(null);
    setAmount(0);

    await addUserHoldings(user.uid, data);
    await fetchTotalValue();
  }

  function removeHoldings(coin) {
    deleteUserHoldings(user.uid, cryptocurrency[coin.symbol]);
    fetchTotalValue();
  }

  useEffect(() => {
    async function getStarted() {
      let settings = await getUserSettings(user.uid);
      setSettings(settings);
      fetchTotalValue();
    }
    getStarted();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <Navbar active="/holdings" />
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
              Holdings
            </h1>
            <div
              className="dashboard-market-card-wrapper noselect"
              style={{ marginBottom: 20 }}
            >
              <div className="dashboard-market-cap-card">
                <span className="title">Total Value</span>
                <span className="subtitle" id="dashboard-holdings-value">
                  ${totalValue}
                </span>
              </div>
              <button
                className="buttonNoStyles"
                onClick={() => {
                  setDisplayPopup(!displayPopup);
                }}
              >
                <div className="holdings-add-card" id="holdings-add-card">
                  <span className="title">Add Coin</span>
                  <svg
                    width={1792}
                    height={1792}
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z" />
                  </svg>
                </div>
              </button>
              <div
                className="dashboard-market-cap-card"
                style={{ visibility: "hidden" }}
              ></div>
            </div>
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
                    <span className="title">Recording Event</span>
                  </div>

                  <div className="bottom">
                    <input
                      id="popup-coin"
                      placeholder="Coin Symbol... (e.g. BTC)"
                      value={coinSymbol}
                      onChange={(e) => {
                        setCoinSymbol(e.target.value);
                      }}
                    />
                    <input
                      id="popup-amount"
                      placeholder="Amount... (e.g. 2.5)"
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                    <button
                      className="reject"
                      id="popup-cancel"
                      onClick={() => {
                        setCoinSymbol("");
                        setAmount("");
                        setDisplayPopup(!displayPopup);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="resolve"
                      id="popup-confirm"
                      onClick={onSubmitAddHolding}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {edit ? (
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
                    <span className="title">Edit {edit.toUpperCase()} Amount</span>
                  </div>

                  <div className="bottom">
                    <input
                      id="popup-amount"
                      placeholder="Amount... (e.g. 2.5)"
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                    <button
                      className="reject"
                      id="popup-cancel"
                      onClick={() => {
                        setCoinSymbol("");
                        setAmount("");
                        setEdit(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="resolve"
                      id="popup-confirm"
                      onClick={(e) => {
                        e.preventDefault();
                        editHoldings(edit);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="holdings-list-wrapper noselect">
              <table className="dashboard-market-list-wrapper noselect">
                <tr className="headers-wrapper" data-list="dashboardMarket">
                  <th></th>
                  <th>Coin</th>
                  <th>Amount</th>
                  <th>Value</th>
                  <th>24h Change</th>
                </tr>
                {holdingsDic.map((coin) => (
                  <tr className="coin-wrapper">
                    <td>
                      <button
                        className="deleteWatchlist"
                        onClick={(e) => {
                          e.preventDefault();
                          setAmount(coin.amount);
                          setEdit(coin.symbol);
                        }}
                      >
                        ✎
                      </button>
                      <button
                        className="deleteWatchlist"
                        onClick={(e) => {
                          e.preventDefault();
                          removeHoldings(coin);
                        }}
                      >
                        x
                      </button>
                    </td>
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
                    <td style={{ color: coin.change >= 0 ? "green" : "red" }}>
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
      ) : (
        <Login />
      )}
    </div>
  );
}
