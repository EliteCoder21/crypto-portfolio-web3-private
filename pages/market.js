import Navbar from "../components/navbar.js";

export default function Market() {
  return (
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
        <div className="stats-wrapper noselect" style={{ marginBottom: 20 }}>
          <div className="stats-card market-cap">
            <span className="stats-title title">Market Cap</span>
            <span className="stats-subtitle subtitle" id="global-market-cap">
              ...
            </span>
          </div>
          <div className="stats-card volume">
            <span className="stats-title title">24h Volume</span>
            <span className="stats-subtitle subtitle" id="global-volume">
              ...
            </span>
          </div>
          <div className="stats-card dominance">
            <span className="stats-title title">BTC Dominance</span>
            <span className="stats-subtitle subtitle" id="global-dominance">
              ...
            </span>
          </div>
        </div>
        <div className="page-navigation-wrapper noselect" id="page-navigation">
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
        <div className="market-list-wrapper noselect">
          <div className="headers-wrapper" data-list="market">
            <span className="header rank" data-item="rank">
              #
            </span>
            <span className="header coin" data-item="coin">
              Coin
            </span>
            <span className="header price" data-item="price">
              Price
            </span>
            <span className="header market-cap" data-item="market-cap">
              Market Cap
            </span>
            <span className="header day" data-item="change">
              24h Change
            </span>
          </div>
          <div className="market-list loading" id="market-list" data-page={1}>
            <div className="coin-wrapper loading">
              <span>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
