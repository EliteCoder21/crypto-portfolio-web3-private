import styles from "../styles/globals.css"

export default function InstructionsComponent() {
  return (
    <div className="page dashboard active" id="page-dashboard">
      <h1
        style={{
          lineHeight: 80,
          fontWeight: 300,
          fontSize: 40,
          color: "white",
          margin: 0,
          padding: 0,
          textAlign: "center",
        }}
      >
        Asset Inventory
      </h1>
      <div>
        <div className="container-fluid">
          <div className="card-deck-wraper">
            <div className="card-deck d-flex flex-type justify-content-center">
              <div style={{ width: "80%", paddingBottom: 20 }}>
                <div className="sectionGrid">
                  <div>
                    <a className="link explore" href="assets.html">
                      <div className="sectionCard card">
                        <div className="card-body">
                          <span
                            className="material-icons"
                            style={{ fontSize: 120, marginBottom: 20 }}
                          >
                            domain
                          </span>
                          <div className="launchSurround">
                            <div className="launch">
                              <p>Launch App</p>
                              <i className="material-icons">launch</i>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <p className="css-146c3p1">RWA in Custody</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div>
                    <a className="link explore" href="aut.html">
                      <div className="sectionCard card">
                        <div className="card-body">
                          <span
                            className="material-icons"
                            style={{ fontSize: 120, marginBottom: 20 }}
                          >
                            bar_chart
                          </span>
                          <div className="launchSurround">
                            <div className="launch">
                              <p>Launch App</p>
                              <i className="material-icons">launch</i>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <p
                            className="css-146c3p1"
                            style={{ display: "flex" }}
                          >
                            <span className="lg-view">Asset Unique Token</span>
                            <span className="sm-view">AUT</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div>
                    <a className="link explore" href="oxa.html">
                      <div className="sectionCard card">
                        <div className="card-body">
                          <span
                            className="material-icons"
                            style={{ fontSize: 120, marginBottom: 20 }}
                          >
                            request_quote
                          </span>
                          <div className="launchSurround">
                            <div className="launch">
                              <p>Launch App</p>
                              <i className="material-icons">launch</i>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <p
                            className="css-146c3p1"
                            style={{ display: "flex" }}
                          >
                            <span className="lg-view">Stable Credit Token</span>
                            <span className="sm-view">OXA</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div>
                    <a className="link explore" href="holdings.html">
                      <div className="sectionCard card">
                        <div className="card-body">
                          <span
                            className="material-icons"
                            style={{ fontSize: 120, marginBottom: 20 }}
                          >
                            assured_workload
                          </span>
                          <div className="launchSurround">
                            <div className="launch">
                              <p>Launch App</p>
                              <i className="material-icons">launch</i>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <p className="css-146c3p1">Digital Assets</p>
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
      <div
        className="dashboard-market-card-wrapper noselect"
        style={{ marginBottom: 20 }}
      >
        <div className="dashboard-market-cap-card">
          <span className="title">Market Cap</span>
          <span className="subtitle" id="dashboard-market-cap">
            ...
          </span>
        </div>
        <div className="dashboard-market-cap-card">
          <span className="title">24h Change</span>
          <span className="subtitle" id="dashboard-market-change">
            ...
          </span>
        </div>
        <div className="dashboard-market-cap-card">
          <span className="title">Total Value</span>
          <span className="subtitle" id="dashboard-holdings-value">
            ...
          </span>
        </div>
      </div>
      <div className="dashboard-row">
        <div>
          <div className="dashboard-market-list-wrapper noselect">
            <div className="headers-wrapper" data-list="dashboardMarket">
              <span className="header coin" data-item="coin">
                Coin
              </span>
              <span className="header price" data-item="price">
                Price
              </span>
              <span className="header market-cap" data-item="marketCap">
                Market Cap
              </span>
              <span className="header day" data-item="change">
                24h Change
              </span>
            </div>
            <div
              className="dashboard-market-list loading"
              id="dashboard-market-list"
            >
              <div className="coin-wrapper loading">
                <span>Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <div />
        <div>
          <div className="dashboard-holdings-list-wrapper noselect">
            <div className="headers-wrapper" data-list="dashboardHoldings">
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
                24h Change
              </span>
            </div>
            <div
              className="dashboard-holdings-list loading"
              id="dashboard-holdings-list"
            >
              <div className="coin-wrapper loading">
                <span>Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
