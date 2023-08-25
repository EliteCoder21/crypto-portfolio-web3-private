import Navbar from "../components/navbar.js";
import { useState, useEffect } from "react";
import { useAuthContext } from '../firebase/context';
import Login from "../components/login.js";
import { addUserHoldings, getUserHoldings } from "../firebase/user.js";
import cryptocurrency from "../assets/crypto.js";
import { getHoldingsWithValue } from "../assets/coindesk.js";

export default function Holdings() {
  const [displayPopup, setDisplayPopup] = useState(false);
  const [coinSymbol, setCoinSymbol] = useState("");
  const [amount, setAmount] = useState(0);
  const { user } = useAuthContext();
  const [edit, setEdit] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  async function fetchTotalValue(settings) {
    let coins = await getUserHoldings(user.uid);
    let list = Object.keys(coins).join("%2C");
    const currency = settings ? settings.currency : "usd";

    const data = await getHoldingsWithValue(currency, list, coins);

    setTotalValue(data.totalValue);
  }

  function onSubmitAddHolding(e) {
    try {
      e.preventDefault();
      let data = {};
      data[cryptocurrency[coinSymbol.toUpperCase()]] = {
        amount: amount,
        symbol: coinSymbol.toUpperCase()
      }
      setTotalValue(totalValue + amount);
      addUserHoldings(user.uid, data);
    } catch (e) {
      alert("Not a valid coin symbol");
    }
  }

  function editHoldings() {
      (!edit);
      if (edit == true) {
        data[cryptocurrency[coinSymbol.toUpperCase()]] = {
          amount: amount,
          symbol: coinSymbol.toUpperCase()
        }
        setTotalValue(totalValue + amount);
        addUserHoldings(user.uid, data);
      }
  }

  useEffect(() => {
    fetchTotalValue();
  }, []);

  return (
    <div>
      { user ?
        <div>
          <Navbar active="/holdings" />
          <div className="page holdings active" id="page-holdings">
            <h1
              style={{
                fontWeight: 300,
                fontSize: 40,
                color: 'white',
                margin: 20,
                padding: 0,
                textAlign: 'center',
              }}
            >
              Holdings
            </h1>
            <div className="holdings-card-wrapper noselect" style={{ marginBottom: 20 }}>
              <div className="holdings-value-card" id="holdings-value-card">
                <span className="title">Total Value</span>
                <span className="subtitle" id="holdings-total-value">{totalValue}</span>
              </div>
              <button onClick={() => {setDisplayPopup(!displayPopup)}}>
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
              { displayPopup ?
                <>
                  <div className="bottom">
                    <input id="popup-coin" placeholder="Coin Symbol... (e.g. BTC)" value={coinSymbol} onChange={(e) => { setCoinSymbol(e.target.value) }} />
                    <input id="popup-amount" placeholder="Amount... (e.g. 2.5)" type="number" value={amount} onChange={(e) => {setAmount(e.target.value) }}/>
                    <button className="reject" id="popup-cancel" onClick={() => {
                      setCoinSymbol("");
                      setAmount("");
                      setDisplayPopup(!displayPopup);
                    }}>Cancel</button>
                    <button className="resolve" id="popup-confirm" onClick={onSubmitAddHolding}>Confirm</button>
                  </div>
                </>
                :
                <></>
              }
            </div>
            <div className="more-menu hidden" id="holdings-more-menu">
              <button id="more-edit">Edit</button>
              <button onClick={editHoldings}></button>
              <button id="more-remove">Remove</button>
            </div>
            <div className="holdings-list-wrapper noselect">
              <div className="headers-wrapper" data-list="holdings">
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
                  24h Price Change
                </span>
              </div>
              <div className="holdings-list loading" id="holdings-list">
                <div className="coin-wrapper loading">
                  <span>Loading...</span>
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