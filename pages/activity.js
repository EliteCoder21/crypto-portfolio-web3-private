import Navbar from "../components/navbar.js";
import { useState, useEffect } from "react";
import Login from "../components/login.js";
import { useAuthContext } from "../firebase/context";
import cryptocurrency from "../assets/crypto.js";
import images from "../assets/images.js";
import {
  addUserActivity,
  addUserHoldings,
  getUserActivities,
  getUserHoldings,
  getUserSettings,
} from "../firebase/user.js";

export default function Activity() {
  const [displayRecord, setDisplayRecord] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [originalActivityData, setOriginalActivityData] = useState([]);
  const [settings, setSettings] = useState();
  const [query, setQuery] = useState();
  const { user } = useAuthContext();

  const [symbol, setSymbol] = useState("");
  const [date, setDate] = useState("");
  const [typeEvent, setTypeEvent] = useState("buy");
  const [amount, setAmount] = useState();
  const [fee, setFee] = useState();
  const [notes, setNotes] = useState();
  const [exchange, setExchange] = useState();
  const [pair, setPair] = useState();
  const [price, setPrice] = useState();

  async function getActivityData() {
    try {
      const docsSnap = await getUserActivities(user.uid);
      const TABLE_STATE = [];

      docsSnap.forEach((doc) => {
        // Get the data
        const data = doc.data();

        // Append the data
        TABLE_STATE.push({
          date: data.date,
          coin: data.coin.toUpperCase(),
          amount: data.amount,
          type: data.type,
          notes: data.notes,
        });
      });

      setActivityData(TABLE_STATE);
      setOriginalActivityData(TABLE_STATE);
    } catch (error) {
      console.log(error);
    }
  }

  async function addActivity(e) {
    e.preventDefault();

    const data = {
      coin: symbol.toUpperCase(),
      date: date,
      type: typeEvent,
      amount: Number(amount) ?? amount,
      fee: fee,
      notes: notes,
      exchange: exchange,
      pair: pair,
      price: price,
    };

    await addUserActivity(user.uid, data);

    if (settings.transactions == "enabled") {
      let holdings = await getUserHoldings(user.uid);

      if (data.type != "transfer") {
        if (holdings.hasOwnProperty(cryptocurrency[data.coin])) {
          const holdingsAmount =
            data.type == "buy"
              ? Number(holdings[cryptocurrency[data.coin]].amount) + data.amount
              : Number(holdings[cryptocurrency[data.coin]].amount) -
                data.amount;
          holdings[cryptocurrency[data.coin]] = {
            amount: holdingsAmount,
            symbol: data.coin,
          };
        } else {
          holdings[cryptocurrency[data.coin]] = {
            amount: data.amount,
            symbol: data.coin,
          };
        }
      }

      await addUserHoldings(user.uid, holdings);
    }

    setSymbol("");
    setDate("");
    setTypeEvent("buy");
    setAmount();
    setFee();
    setNotes("");
    setExchange();
    setPair();
    setPrice();
    setDisplayRecord(false);

    getActivityData();
  }

  const renderTable = () => {
    return (
      <table className="dashboard-market-list-wrapper noselect">
        <tr className="headers-wrapper" data-list="dashboardMarket">
          <th>Date</th>
          <th>Coin</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Notes</th>
        </tr>
        {renderLogs()}
      </table>
    );
  };

  const renderLogs = () => {
    return activityData.map(({ date, coin, amount, type, notes }) => {
      return (
        <tr className="coin-wrapper">
          <td>{date}</td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img draggable="false" src={images[coin]} title={coin} />
              <p className="coin" title={coin}>
                {coin}
              </p>
            </div>
          </td>
          <td>{amount}</td>
          <td>{type}</td>
          <td>{notes}</td>
        </tr>
      );
    });
  };

  async function searchActivities(e) {
    e.preventDefault();

    const list = [...originalActivityData];

    if (!query || query == "") {
      setActivityData(list);
    } else {
      let fitQuery = [];

      list.forEach((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (key.includes(query) || value.includes(query)) {
            fitQuery.push(item);
            break;
          }
        }
      });

      setActivityData(fitQuery);
    }
  }

  async function fetchSettings() {
    const result = await getUserSettings(user.uid);
    setSettings(result);
  }

  useEffect(() => {
    getActivityData();
    fetchSettings();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <Navbar active="/activity" />
          {displayRecord ? (
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
                    id="popup-symbol"
                    placeholder="Symbol... (e.g. BTC)"
                    value={symbol}
                    onChange={(e) => {
                      setSymbol(e.target.value);
                    }}
                  />
                  <input
                    id="popup-date"
                    placeholder="Date... (e.g. 2021/04/18 04:20)"
                    type="text"
                    class="flatpickr-input"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                  <div id="popup-choice">
                    <button
                      className={
                        typeEvent == "buy" ? "choice active" : "choice"
                      }
                      onClick={() => {
                        setTypeEvent("buy");
                      }}
                    >
                      Buy
                    </button>
                    <button
                      className={
                        typeEvent == "sell" ? "choice active" : "choice"
                      }
                      onClick={() => {
                        setTypeEvent("sell");
                      }}
                    >
                      Sell
                    </button>
                    <button
                      className={
                        typeEvent == "transfer" ? "choice active" : "choice"
                      }
                      onClick={() => {
                        setTypeEvent("transfer");
                      }}
                    >
                      Transfer
                    </button>
                  </div>
                  <input
                    id="popup-amount"
                    placeholder="Amount... (e.g. 2.5)"
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                  <input
                    id="popup-fee"
                    placeholder="Fee... (e.g. 0.25)"
                    type="number"
                    value={fee}
                    onChange={(e) => {
                      setFee(e.target.value);
                    }}
                  />
                  <input
                    id="popup-notes"
                    placeholder="Notes... (e.g. Rent)"
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                    }}
                  />
                  <input
                    id="popup-exchange"
                    placeholder="Exchange... (e.g. Coinbase)"
                    value={exchange}
                    onChange={(e) => {
                      setExchange(e.target.value);
                    }}
                  />
                  <input
                    id="popup-pair"
                    placeholder="Pair... (e.g. BTC/USDT)"
                    value={pair}
                    onChange={(e) => {
                      setPair(e.target.value);
                    }}
                  />
                  <input
                    id="popup-price"
                    placeholder="Price... (e.g. 59000)"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <button
                    class="reject"
                    id="popup-cancel"
                    onClick={() => {
                      setDisplayRecord(!displayRecord);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    class="resolve"
                    id="popup-confirm"
                    onClick={addActivity}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="page activity active" id="page-activity">
            <div>
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
                Activity
              </h1>

              <div
                className="activity-card-wrapper noselect"
                style={{ marginBottom: 20 }}
              >
                <button
                  className="buttonNoStyles"
                  onClick={() => {
                    setDisplayRecord(!displayRecord);
                  }}
                >
                  <div className="activity-add-card" id="activity-add-card">
                    <span className="title">Record Event</span>
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
                <div className="activity-search-wrapper">
                  <input
                    type="text"
                    id="activity-search-input"
                    placeholder="Query..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                  />
                  <button
                    id="activity-search-button"
                    onClick={searchActivities}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="holdings-list-wrapper noselect">
                {renderTable()}
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
