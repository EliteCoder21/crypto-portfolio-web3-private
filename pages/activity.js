import Navbar from "../components/navbar.js";
import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import firebase_app from "../firebase/config";
import Login from "../components/login.js";
import { useAuthContext } from "../firebase/context";

const db = getFirestore(firebase_app);

const TABLE_STATE = [];

export default function Activity() {
  const [displayRecord, setDisplayRecord] = useState(false);
  const [activityData, setActivityData] = useState(TABLE_STATE);
  const [typeEvent, setTypeEvent] = useState("buy");
  const { user } = useAuthContext();

  async function getActivityData() {
    try {
      const dataCollection = collection(
        doc(collection(db, "user-activity"), user.uid),
        "activity-data"
      );

      const docsSnap = await getDocs(dataCollection);

      docsSnap.forEach((doc) => {
        // Get the data
        const data = doc.data();
        // Append the data
        TABLE_STATE.push({
          date: data.date,
          coin: data.coin,
          amount: data.amount,
          type: data.type,
          notes: data.notes,
        });

        setActivityData(TABLE_STATE);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const renderTable = () => {
    return (
      <table className="activity-list-wrapper noselect">
        <div className="headers-wrapper" data-list="activity">
          <th className="header date" data-item="date">
            Date
          </th>
          <th className="header symbol" data-item="coin">
            Coin
          </th>
          <th className="header amount" data-item="amount">
            Amount
          </th>
          <th className="header type" data-item="type">
            Type
          </th>
          <th className="header notes" data-item="notes">
            Notes
          </th>
        </div>
        {renderLogs()}
      </table>
    );
  };

  const renderLogs = () => {
    return activityData.map(({ date, coin, amount, type, notes }) => {
      return (
        <div className="activity-list loading" id="activity-list">
          <div className="event-wrapper loading">
            <tr>
              <td className="header date" data-item="date">
                {date}
              </td>
              <td className="header symbol" data-item="coin">
                {coin}
              </td>
              <td className="header amount" data-item="amount">
                {amount}
              </td>
              <td className="header type" data-item="type">
                {type}
              </td>
              <td className="header notes" data-item="notes">
                {notes}
              </td>
            </tr>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    getActivityData();
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
                  <input id="popup-symbol" placeholder="Symbol... (e.g. BTC)" />
                  <input
                    id="popup-date"
                    placeholder="Date... (e.g. 2021/04/18 04:20)"
                    type="text"
                    class="flatpickr-input"
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
                  />
                  <input
                    id="popup-fee"
                    placeholder="Fee... (e.g. 0.25)"
                    type="number"
                  />
                  <input id="popup-notes" placeholder="Notes... (e.g. Rent)" />
                  <input
                    id="popup-exchange"
                    placeholder="Exchange... (e.g. Coinbase)"
                  />
                  <input
                    id="popup-pair"
                    placeholder="Pair... (e.g. BTC/USDT)"
                  />
                  <input id="popup-price" placeholder="Price... (e.g. 59000)" />
                  <input
                    id="popup-from"
                    class="hidden"
                    placeholder="From... (e.g. Kraken)"
                  />
                  <input
                    id="popup-to"
                    class="hidden"
                    placeholder="To... (e.g. Cold Wallet)"
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
                  <button class="resolve" id="popup-confirm">
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
                  />
                  <button id="activity-search-button">Search</button>
                </div>
              </div>
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
