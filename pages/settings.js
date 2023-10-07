import Navbar from "../components/Navbar.js";
import { useAuthContext } from "../firebase/context";
import Login from "../components/Login.js";
import { useEffect, useState } from "react";
import {
  addUserActivityBulk,
  addUserHoldings,
  getUserActivities,
  getUserHoldings,
  getUserSettings,
  setUserSettings,
} from "../firebase/user.js";
import cryptocurrency from "../assets/crypto.js";
import { empty, replaceAll, validDate } from "../assets/string.js";

export default function Settings() {
  const { user } = useAuthContext();
  const [settings, setSettings] = useState();
  const [waitlistInput, setWaitlistInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [ethTokenChoice, setEthTokenChoice] = useState("add");
  const [importHoldingsFile, setImportHoldingsFile] = useState(null);
  const [importActivityFile, setImportActivityFile] = useState(null);

  const fileReader = new FileReader();

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

  async function importHoldings() {
    try {
      fileReader.onload = async function (event) {
        const data = event.target.result;
        let rows = data.split(/\r?\n/);
        if (rows[0] === "id,symbol,amount") {
          let formatted = [];
          rows.map((row) => {
            if (!empty(row) && !row.toLowerCase().includes("symbol,")) {
              formatted.push(row);
            }
          });

          let current = await getUserHoldings(user.uid);

          rows.map((row) => {
            let data = row.split(",");

            let id = data[0];
            let symbol = data[1].toUpperCase();
            let amount = Number(data[2]);

            if (id != "id") {
              if (Object.keys(current).includes(id)) {
                current[id].amount = Number(current[id].amount) + amount;
              } else {
                current[id] = { symbol: symbol, amount: amount };
              }
            }
          });

          await addUserHoldings(user.uid, current);

          alert("Imported Holdings Successfully");
        } else {
          throw Error(
            "Not the proper format. It should be CSV file with columns id,symbol,amount."
          );
        }
      };

      fileReader.readAsText(importHoldingsFile);
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  }

  async function exportHoldings() {
    try {
      let headers = ["id", "symbol", "amount"];
      let csvData = headers.join(",") + "\r\n";
      let holdings = await getUserHoldings(user.uid);

      Object.keys(holdings).map((id) => {
        let holding = holdings[id];
        let array = [id, holding["symbol"], holding["amount"]];
        csvData += array.join(",") + "\r\n";
      });

      const blob = new Blob([csvData], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "holdings.csv";
      link.click();

      URL.revokeObjectURL(url);
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  }

  async function importActivity() {
    try {
      fileReader.onload = async function (event) {
        const data = event.target.result;
        let rows = data.split(/\r?\n/);

        if (
          rows[0].includes(
            "coin,date,type,amount,fee,notes,exchange,pair,price,from,to"
          )
        ) {
          let formatted = [];

          rows.map((row) => {
            if (!empty(row) && !row.toLowerCase().includes("symbol,")) {
              if (rows[0].includes("txID")) {
                formatted.push(row);
              } else {
                formatted.push("-," + row);
              }
            }
          });

          let current = [];

          rows.map((row) => {
            let data = row.split(",");

            let coin = data[0].toUpperCase();
            let date = replaceAll(replaceAll(data[1], "'", ""), '"', "");
            let type = data[2].toLowerCase();
            let amount = data[3];
            let fee = data[4];
            let notes = data[5];

            if (coin != "coin") {
              if (validDate(date)) {
                let activity = {
                  coin: coin,
                  date: date,
                  type: type,
                  amount: amount,
                  fee: fee,
                  notes: notes,
                };

                if (type === "buy" || type === "sell" || type === "transfer") {
                  if (type === "buy" || type === "sell") {
                    let exchange = !empty(data[6])
                      ? replaceAll(data[6], '"', "")
                      : "-";
                    let pair = !empty(data[7])
                      ? replaceAll(data[7], '"', "")
                      : "-";
                    let price = !empty(data[8]) ? data[8] : 0;

                    activity["exchange"] = exchange;
                    activity["pair"] = pair;
                    activity["price"] = price;
                  } else if (type === "transfer") {
                    let from = !empty(data[9])
                      ? replaceAll(data[9], '"', "")
                      : "-";
                    let to = !empty(data[10])
                      ? replaceAll(data[10], '"', "")
                      : "-";

                    activity["from"] = from;
                    activity["to"] = to;
                  }

                  current.push(activity);
                } else {
                  throw Error("Invalid activity type.");
                }
              } else {
                throw Error("Invalid date.");
              }
            }
          });

          await addUserActivityBulk(user.uid, current);
          alert("Imported Activities Successfully");
        } else {
          throw Error(
            "Not the proper format. It should be CSV file with columns coin,date,type,amount,fee,notes,exchange,pair,price,from,to."
          );
        }
      };

      fileReader.readAsText(importActivityFile);
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  }

  async function exportActivities() {
    let headers = ["coin", "date", "type", "amount", "fee", "notes", "exchange", "pair", "price", "from", "to"];
		let csv = headers.join(",") + '\r\n';

    let activities = await getUserActivities(user.uid);

		activities.forEach(doc => {
      const event = doc.data();
			let array = [event["coin"], event["date"], event["type"], event["amount"], event["fee"], event["notes"], event["exchange"], event["pair"], event["price"], event["from"], event["to"]];
			csv += array.join(",") + '\r\n';
		});

		const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "activities.csv";
    link.click();

    URL.revokeObjectURL(url);
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
                    settings && settings.transactions == "enabled"
                      ? "choice active"
                      : "choice"
                  }
                  data-value="enabled"
                  onClick={() => {
                    changeTransactionHoldings("enabled");
                  }}
                >
                  Enabled
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Import Holdings</span>
              </div>
              <div className="bottom">
                <input
                  type="file"
                  onChange={(e) => setImportHoldingsFile(e.target.files[0])}
                  accept={".csv"}
                />
                <button
                  className="submit inline"
                  id="import-holdings-button"
                  onClick={importHoldings}
                >
                  Import
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Import Activity</span>
              </div>
              <div className="bottom">
                <input
                  type="file"
                  onChange={(e) => setImportActivityFile(e.target.files[0])}
                  accept={".csv"}
                />
                <button
                  className="submit inline"
                  id="import-activity-button"
                  onClick={importActivity}
                >
                  Import
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Export Holdings</span>
              </div>
              <div className="bottom">
                <button
                  className="submit inline"
                  id="export-holdings-button"
                  onClick={exportHoldings}
                >
                  Export
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Export Activity</span>
              </div>
              <div className="bottom">
                <button className="submit inline" id="export-activity-button" onClick={exportActivities}>
                  Export
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
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
