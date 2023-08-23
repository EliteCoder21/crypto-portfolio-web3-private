import Navbar from "../components/navbar.js";
import { useAuthContext } from "../firebase/context";
import Login from "../components/login.js";
import { useEffect, useState } from "react";
import {
  addUserHoldings,
  getUserHoldings,
  getUserSettings,
  setUserSettings,
} from "../firebase/user.js";
import cryptocurrency from "../constants/crypto.js";

export default function Settings() {
  const { user } = useAuthContext();
  const [settings, setSettings] = useState();
  const [waitlistInput, setWaitlistInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [ethTokenChoice, setEthTokenChoice] = useState("add");

  async function fetchSettings() {
    const result = await getUserSettings(user.uid);
    setSettings(result);
  }

  async function importEthTokens() {
    const req = await fetch(
      "https://api.ethplorer.io/getAddressInfo/" +
        addressInput +
        "?apiKey=freekey"
    );
    const balance = await req.json();

    let eth = parseFloat(balance["ETH"].balance.toFixed(3));
    let tokens = balance.tokens;

    let index = 0;

    Object.keys(tokens).map(async (key) => {
      index++;

      let token = tokens[key];
      let info = token.tokenInfo;
      let id = info.symbol;

      try {
        let balance = token.balance;
        let string = balance.toFixed(0);
        let decimals = parseInt(info.decimals);
        let position = string.length - decimals;
        let split = string.split("");
        split.splice(position, 0, ".");
        let join = split.join("");

        let amount = parseFloat(parseFloat(join).toFixed(2));

        if (settings.importTokens === "add") {
          const currentHoldings = await getUserHoldings(user.uid);
          const valueToAdd = currentHoldings[cryptocurrency[id]]
            ? currentHoldings[cryptocurrency[id]].amount
            : 0;

          let data = {};
          data[cryptocurrency[id]] = {
            amount: amount + valueToAdd,
            symbol: id.toUpperCase(),
          };
          addUserHoldings(user.uid, data);
        } else {
          let data = {};
          data[cryptocurrency[id]] = {
            amount: amount,
            symbol: id.toUpperCase(),
          };
          addUserHoldings(user.uid, data);
        }

        alert("Added");
      } catch (e) {
        alert(e.message);
      }
    });

    setAddressInput("");
    setEthTokenChoice("add");
  }

  async function changeCurrency(currency) {
    await setUserSettings(user.uid, { currency: currency });
    fetchSettings();
  }

  async function changeTransactionHoldings(transactionHolding) {
    await setUserSettings(user.uid, { transactions: transactionHolding });
    fetchSettings();
  }

  async function addItemToWaitlist() {
    let data = {};
    data[cryptocurrency[waitlistInput.toUpperCase()]] = {
      symbol: waitlistInput.toUpperCase(),
    };

    await setUserSettings(user.uid, { watchlist: data });
    setWaitlistInput("");
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <Navbar active="/settings" />
          <div className="page settings active" id="page-settings">
            <h1
              style={{
                lineHeight: "80px",
                fontWeight: 300,
                fontSize: "40px",
                color: "white",
                margin: "0px",
                padding: "0px",
                textAlign: "center",
              }}
            >
              Settings
            </h1>
            <div className="section noapi-hidden">
              <div className="top noselect">
                <span className="title">Share Holdings</span>
              </div>
              <div
                className="bottom settings-choices-wrapper"
                data-key="shareHoldings"
              >
                <button className="server-choice" data-value="disabled">
                  Disabled
                </button>
                <button className="server-choice" data-value="enabled">
                  Enabled
                </button>
                <input
                  type="text"
                  placeholder="Access PIN..."
                  id="input-access-pin"
                />
                <button className="submit" id="change-pin-button">
                  Confirm PIN
                </button>
                <input
                  type="text"
                  placeholder="Sharing URL"
                  id="sharing-url"
                  readOnly
                />
                <button className="submit" id="copy-url-button">
                  Copy URL
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Import ETH Tokens</span>
              </div>
              <div className="description noselect">
                <span>
                  Using Ethplorer, the current balance of the tokens in your ETH
                  wallet can be imported into Cryptofolio. Your Ethereum token
                  holdings would either get added to your current holdings, or
                  would replace them depending on which option you choose.
                  Tokens that aren't listed on CoinGecko would not get added.
                </span>
              </div>
              <div className="bottom">
                <input
                  type="text"
                  placeholder="ETH Address..."
                  value={addressInput}
                  onChange={(e) => {
                    setAddressInput(e.target.value);
                  }}
                />
                <div
                  className="settings-choices-wrapper"
                  data-key="importTokens"
                >
                  <button
                    className={
                      ethTokenChoice == "add" ? "choice active" : "choice"
                    }
                    data-value="add"
                    onClick={() => {
                      setEthTokenChoice("add");
                    }}
                  >
                    Add
                  </button>
                  <button
                    className={
                      ethTokenChoice == "replace" ? "choice active" : "choice"
                    }
                    data-value="replace"
                    onClick={() => {
                      setEthTokenChoice("replace");
                    }}
                  >
                    Replace
                  </button>
                </div>
                <button
                  className="submit"
                  id="import-tokens-button"
                  onClick={importEthTokens}
                >
                  Import
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Fiat Currency</span>
              </div>
              <div
                className="bottom settings-choices-wrapper"
                data-key="currency"
              >
                <button
                  className={
                    settings && settings.currency == "usd"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="usd"
                  onClick={() => {
                    changeCurrency("usd");
                  }}
                >
                  USD
                </button>
                <button
                  className={
                    settings && settings.currency == "gbp"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="gbp"
                  onClick={() => {
                    changeCurrency("gbp");
                  }}
                >
                  GBP
                </button>
                <button
                  className={
                    settings && settings.currency == "eur"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="eur"
                  onClick={() => {
                    changeCurrency("eur");
                  }}
                >
                  EUR
                </button>
                <button
                  className={
                    settings && settings.currency == "chf"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="chf"
                  onClick={() => {
                    changeCurrency("chf");
                  }}
                >
                  CHF
                </button>
                <button
                  className={
                    settings && settings.currency == "aud"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="aud"
                  onClick={() => {
                    changeCurrency("aud");
                  }}
                >
                  AUD
                </button>
                <button
                  className={
                    settings && settings.currency == "jpy"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="jpy"
                  onClick={() => {
                    changeCurrency("jpy");
                  }}
                >
                  JPY
                </button>
                <button
                  className={
                    settings && settings.currency == "cad"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="cad"
                  onClick={() => {
                    changeCurrency("cad");
                  }}
                >
                  CAD
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Adding to Watchlist</span>
              </div>
              <div
                className="bottom settings-choices-wrapper"
                data-key="dashboardWatchlist"
              >
                <button className="close-button hidden">
                  <svg
                    className="close-icon"
                    width={1792}
                    height={1792}
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
                  </svg>
                </button>

                <div>
                  <div className="bottom">
                    <input
                      id="popup-coin"
                      placeholder="Coin Symbol... (e.g. BTC)"
                      value={waitlistInput}
                      onChange={(e) => {
                        setWaitlistInput(e.target.value);
                      }}
                    />
                    <div
                      className="bottom settings-choices-wrapper"
                      data-key="sortOrderNotification"
                    >
                      <button
                        className="choice"
                        data-value="confirm"
                        onClick={addItemToWaitlist}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Transactions Affect Holdings</span>
              </div>
              <div
                className="bottom settings-choices-wrapper"
                data-key="transactionsAffectHoldings"
              >
                <button
                  className={
                    settings && settings.transactions == "disabled"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="disabled"
                  onClick={() => {
                    changeTransactionHoldings("disabled");
                  }}
                >
                  Disabled
                </button>
                <button
                  className={
                    settings && settings.transactions == "mixed"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="mixed"
                  onClick={() => {
                    changeTransactionHoldings("mixed");
                  }}
                >
                  Mixed
                </button>
                <button
                  className={
                    settings && settings.transactions == "override"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="override"
                  onClick={() => {
                    changeTransactionHoldings("override");
                  }}
                >
                  Override
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Show Transactions On Charts</span>
              </div>
              <div
                className="bottom settings-choices-wrapper"
                data-key="showTransactionsOnCharts"
              >
                <button className="choice" data-value="disabled">
                  Disabled
                </button>
                <button className="choice" data-value="enabled">
                  Enabled
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Holdings</span>
              </div>
              <div className="bottom">
                <button className="submit inline" id="import-holdings-button">
                  Import Holdings
                </button>
                <button className="submit inline" id="export-holdings-button">
                  Export Holdings
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Activity</span>
              </div>
              <div className="bottom">
                <button className="submit inline" id="import-activity-button">
                  Import Activity
                </button>
                <button className="submit inline" id="export-activity-button">
                  Export Activity
                </button>
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
