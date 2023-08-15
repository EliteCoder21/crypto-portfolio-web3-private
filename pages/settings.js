import Navbar from "../components/navbar.js";
import { useAuthContext } from '../firebase/context';
import Login from "../components/login.js";

export default function Settings() {
  const { user } = useAuthContext();

  return (
    <div>
      { user ?
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
            <div className="section" style={{ display: "none" }}>
              <div className="top noselect">
                <span className="title">Theme</span>
              </div>
              <div className="bottom">
                <div className="toggle-wrapper active" id="theme-toggle">
                  <div className="toggle">
                    <svg
                      className="sun"
                      width={1792}
                      height={1792}
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1472 896q0-117-45.5-223.5t-123-184-184-123-223.5-45.5-223.5 45.5-184 123-123 184-45.5 223.5 45.5 223.5 123 184 184 123 223.5 45.5 223.5-45.5 184-123 123-184 45.5-223.5zm276 277q-4 15-20 20l-292 96v306q0 16-13 26-15 10-29 4l-292-94-180 248q-10 13-26 13t-26-13l-180-248-292 94q-14 6-29-4-13-10-13-26v-306l-292-96q-16-5-20-20-5-17 4-29l180-248-180-248q-9-13-4-29 4-15 20-20l292-96v-306q0-16 13-26 15-10 29-4l292 94 180-248q9-12 26-12t26 12l180 248 292-94q14-6 29 4 13 10 13 26v306l292 96q16 5 20 20 5 16-4 29l-180 248 180 248q9 12 4 29z" />
                    </svg>
                    <svg
                      className="moon"
                      width={1792}
                      height={1792}
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1390 1303q-54 9-110 9-182 0-337-90t-245-245-90-337q0-192 104-357-201 60-328.5 229t-127.5 384q0 130 51 248.5t136.5 204 204 136.5 248.5 51q144 0 273.5-61.5t220.5-171.5zm203-85q-94 203-283.5 324.5t-413.5 121.5q-156 0-298-61t-245-164-164-245-61-298q0-153 57.5-292.5t156-241.5 235.5-164.5 290-68.5q44-2 61 39 18 41-15 72-86 78-131.5 181.5t-45.5 218.5q0 148 73 273t198 198 273 73q118 0 228-51 41-18 72 13 14 14 17.5 34t-4.5 38z" />
                    </svg>
                  </div>
                </div>
                <textarea
                  id="theme-css-input"
                  placeholder="Custom CSS..."
                  spellCheck="false"
                  defaultValue={
                    '\t\t\t--shadow-dark:0 6px 10px rgba(40,40,40,0.25);\n\t\t\t--font-family:"Helvetica Neue", "Lucida Grande", "Arial", "Verdana", "Tahoma", sans-serif;'
                  }
                />
                <div className="button-wrapper">
                  <button className="submit" id="theme-css-confirm">
                    Apply CSS
                  </button>
                  <button className="submit" id="theme-css-reset">
                    Remove Custom CSS
                  </button>
                </div>
              </div>
            </div>
            <div className="section noapi-hidden">
              <div className="top noselect">
                <span className="title">Account</span>
              </div>
              <div className="bottom">
                <input
                  type="password"
                  placeholder="Current Password..."
                  id="input-current-password"
                />
                <input
                  type="password"
                  placeholder="New Password..."
                  id="input-new-password"
                />
                <input
                  type="password"
                  placeholder="Repeat New Password..."
                  id="input-repeat-password"
                />
                <button className="submit" id="change-password-button">
                  Change Password
                </button>
                <button className="submit hidden" id="manage-accounts-button">
                  Manage Accounts
                </button>
                <button className="submit" id="logout-button">
                  Logout
                </button>
              </div>
            </div>
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
                <span className="title">Highlight Price Change</span>
              </div>
              <div
                className="bottom settings-choices-wrapper"
                data-key="highlightPriceChange"
              >
                <button className="choice" data-value="disabled">
                  Disabled
                </button>
                <button className="choice" data-value="row">
                  Row
                </button>
                <button className="choice" data-value="text">
                  Text
                </button>
              </div>
            </div>
            <div className="section">
              <div className="top noselect">
                <span className="title">Dashboard Watchlist</span>
              </div>
              <div
                className="bottom settings-choices-wrapper"
                data-key="dashboardWatchlist"
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
                <span className="title">Sort Order Notification</span>
              </div>
              <div
                className="bottom settings-choices-wrapper"
                data-key="sortOrderNotification"
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
                <span className="title">Additional Dashboard Columns</span>
              </div>
              <div
                className="bottom settings-choices-wrapper"
                data-key="additionalDashboardColumns"
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
                <span className="title">Fiat Currency</span>
              </div>
              <div className="bottom settings-choices-wrapper" data-key="currency">
                <button className="choice" data-value="usd">
                  USD
                </button>
                <button className="choice" data-value="gbp">
                  GBP
                </button>
                <button className="choice" data-value="eur">
                  EUR
                </button>
                <button className="choice" data-value="chf">
                  CHF
                </button>
                <button className="choice" data-value="aud">
                  AUD
                </button>
                <button className="choice" data-value="jpy">
                  JPY
                </button>
                <button className="choice" data-value="cad">
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
                <button className="choice" data-value="disabled">
                  Disabled
                </button>
                <button className="choice" data-value="mixed">
                  Mixed
                </button>
                <button className="choice" data-value="override">
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
            <div className="section">
              <div className="top noselect">
                <span className="title">Historical Data</span>
              </div>
              <div className="bottom">
                <button className="submit inline" id="delete-cache-button">
                  Delete Cache
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
                  holdings would either get added to your current holdings, or would
                  replace them depending on which option you choose. Tokens that
                  aren't listed on CoinGecko would not get added.
                </span>
              </div>
              <div className="bottom">
                <input
                  type="text"
                  placeholder="ETH Address..."
                  id="input-eth-address"
                />
                <div className="settings-choices-wrapper" data-key="importTokens">
                  <button className="choice" data-value="add">
                    Add
                  </button>
                  <button className="choice" data-value="replace">
                    Replace
                  </button>
                </div>
                <button className="submit" id="import-tokens-button">
                  Import
                </button>
              </div>
            </div>
            <div className="section hidden noapi-visible">
              <div className="top noselect">
                <span className="title">No-API Account</span>
              </div>
              <div className="description noselect">
                <span>
                  This progress bar displays how much storage space is left to store
                  No-API mode data. Since the No-API mode isn't meant for long-term
                  use, there are no protections against the loss of data. If there's
                  no remaining storage, many of Cryptofolio's functions may cease to
                  work right. In such an event, it's recommended to export your data
                  to keep it safe.
                </span>
              </div>
              <div className="bottom">
                <div className="storage-wrapper noselect">
                  <div className="background" />
                  <div className="foreground" id="storage-progress" />
                  <span id="storage-text">0%</span>
                </div>
                <button className="submit" id="noapi-clear-button">
                  Clear Data
                </button>
                <button className="submit" id="noapi-logout-button">
                  Logout
                </button>
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
