

export default function Market() {
    return (
        <div>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="./assets/img/favicon/favicon.png"
            />
            <meta name="theme-color" content="#000000" />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="./assets/img/favicon/favicon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="./assets/img/favicon/favicon.png"
            />
            <link rel="manifest" href="./assets/img/favicon/site.webmanifest" />
            <link
                rel="mask-icon"
                href="./assets/img/favicon/safari-pinned-tab.svg"
                color="#42b1e3"
            />
            <link rel="shortcut icon" href="./assets/img/favicon/favicon.png" />
            <meta name="msapplication-TileColor" content="#2d89ef" />
            <meta
                name="msapplication-config"
                content="./assets/img/favicon/browserconfig.xml"
            />
            <meta name="theme-color" content="#000" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, user-scalable=no"
            />
            <meta charSet="utf-8" />
            <link rel="stylesheet" href="./assets/css/light.css" />
            <link rel="stylesheet" href="./assets/css/dark.css" />
            <link rel="stylesheet" href="./assets/css/style.css" />
            <link rel="stylesheet" href="./assets/css/resize.css" />
            <link rel="stylesheet" href="./assets/css/flatpickr.css" />
            <link rel="stylesheet" href="./assets/css/navbar.css" />
            <title>OpenEXA Portfolio</title>
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <div>
                <div className="headerbar">
                <div className="menu_logo">
                    <div className="newnew">
                    <img
                        className="headBar-logo"
                        src="./assets/img/openexamainlogo.png"
                    />
                    </div>
                </div>
                <div className="flex">
                    <div className="relative group">
                    <a
                        className="launchApp-link"
                        href="https://openexa.to"
                        target="_blank"
                    >
                        <button
                        className="transition shadow-md"
                        style={{ borderRadius: 500 }}
                        >
                        <div>Credit Swap</div>
                        </button>
                    </a>
                    </div>
                    <div className="relative group">
                    <a
                        className="launchApp-link"
                        href="https://openexa.io"
                        target="_blank"
                    >
                        <button
                        className="transition shadow-md"
                        style={{ borderRadius: 500 }}
                        >
                        <div>Manage Tokens</div>
                        </button>
                    </a>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <a className="" href="settings.html" style={{ marginRight: 15 }}>
                    <span className="material-icons md-20">settings</span>
                    </a>
                    <button id="logout-button-new">
                    <span className="material-icons md-20"> logout </span>
                    </button>
                </div>
                <div />
                </div>
                <div className="headNav">
                <nav className="navbar navbar-expand navbar-light">
                    <div className="container">
                    <div className="navbar-collapse collapse" id="navbar-nav">
                        <div className="navbar-nav" id="toolbar">
                        <a className="" href="index.html" style={{ marginLeft: 5 }}>
                            <li className="texticon">
                            <button type="button" className="buttonclass">
                                <div className="icon">
                                <span className="material-icons md-20">dashboard</span>
                                </div>
                                <div className="text">
                                <span className="text1">Dashboard</span>
                                <span className="text2" />
                                </div>
                            </button>
                            </li>
                        </a>
                        <a className="" href="assets.html" style={{ marginLeft: 5 }}>
                            <li className="texticon">
                            <button type="button" className="buttonclass">
                                <div className="icon">
                                <span className="material-icons md-20">
                                    account_balance_wallet
                                </span>
                                </div>
                                <div className="text">
                                <span className="text1">Assets</span>
                                <span className="text2" />
                                </div>
                            </button>
                            </li>
                        </a>
                        <a className="" href="aut.html" style={{ marginLeft: 5 }}>
                            <li className="texticon">
                            <button type="button" className="buttonclass">
                                <div className="icon">
                                <span className="material-icons md-20">
                                    monetization_on
                                </span>
                                </div>
                                <div className="text">
                                <span className="text1">AUT</span>
                                <span className="text2" />
                                </div>
                            </button>
                            </li>
                        </a>
                        <a className="" href="oxa.html" style={{ marginLeft: 5 }}>
                            <li className="texticon">
                            <button type="button" className="buttonclass">
                                <div className="icon">
                                <span className="material-icons md-20">token</span>
                                </div>
                                <div className="text">
                                <span className="text1">OXA</span>
                                <span className="text2" />
                                </div>
                            </button>
                            </li>
                        </a>
                        <a className="" href="holdings.html" style={{ marginLeft: 5 }}>
                            <li className="texticon">
                            <button type="button" className="buttonclass">
                                <div className="icon">
                                <span className="material-icons md-20">
                                    data_thresholding
                                </span>
                                </div>
                                <div className="text">
                                <span className="text1">Digital Holdings</span>
                                <span className="text2" />
                                </div>
                            </button>
                            </li>
                        </a>
                        <a
                            className="active"
                            href="market.html"
                            style={{ marginLeft: 5 }}
                        >
                            <li className="texticon">
                            <button type="button" className="buttonclass">
                                <div className="icon">
                                <span className="material-icons md-20">storefront</span>
                                </div>
                                <div className="text">
                                <span className="text1">Market</span>
                                <span className="text2" />
                                </div>
                            </button>
                            </li>
                        </a>
                        <a className="" href="activity.html" style={{ marginLeft: 5 }}>
                            <li className="texticon">
                            <button type="button" className="buttonclass">
                                <div className="icon">
                                <span className="material-icons md-20">swap_horiz</span>
                                </div>
                                <div className="text">
                                <span className="text1">Activity</span>
                                <span className="text2" />
                                </div>
                            </button>
                            </li>
                        </a>
                        </div>
                    </div>
                    </div>
                </nav>
                </div>
            </div>
            <div className="login-wrapper" id="login-wrapper">
                <div>
                <span
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    <img
                    src="./assets/img/openexamainlogo.png"
                    style={{ width: 150, height: "auto", marginBottom: 20 }}
                    />
                </span>
                <input id="login-username" type="text" placeholder="Username..." />
                <input id="login-password" type="password" placeholder="Password..." />
                <button id="login-button">LOG IN</button>
                <button id="login-noapi-button">No-API Mode</button>
                </div>
            </div>
            <div className="loading-overlay active noselect" id="loading-overlay">
                <div className="loading-icon">
                <div />
                <div />
                </div>
            </div>
            <div className="popup-overlay noselect" id="popup-overlay" />
            <div className="popup-wrapper" id="popup-wrapper">
                <div className="top noselect">
                <span className="title">Popup Title</span>
                <button className="close-button">
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
                </div>
                <div className="bottom" />
            </div>
            <div className="page dashboard" id="page-dashboard">
                <div className="dashboard-market-card-wrapper noselect">
                <div className="dashboard-market-cap-card">
                    <span className="title">Market Cap</span>
                    <span className="subtitle" id="dashboard-market-cap">
                    ...
                    </span>
                </div>
                <div className="dashboard-market-change-card">
                    <span className="title">24h Change</span>
                    <span className="subtitle" id="dashboard-market-change">
                    ...
                    </span>
                </div>
                </div>
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
                <div className="dashboard-market-list loading" id="dashboard-market-list">
                    <div className="coin-wrapper loading">
                    <span>Loading...</span>
                    </div>
                </div>
                </div>
                <div className="dashboard-holdings-card-wrapper noselect">
                <div className="dashboard-holdings-card">
                    <span className="title">Total Value</span>
                    <span className="subtitle" id="dashboard-holdings-value">
                    ...
                    </span>
                </div>
                </div>
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
            <div className="page market active" id="page-market">
                <h1
                style={{
                    lineHeight: 80,
                    fontWeight: 300,
                    fontSize: 40,
                    color: "white",
                    margin: 0,
                    padding: 0,
                    textAlign: "center"
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
            <div className="page holdings" id="page-holdings">
                <div className="more-menu hidden" id="holdings-more-menu">
                <button id="more-edit">Edit</button>
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
                <div className="holdings-card-wrapper noselect">
                <div className="holdings-value-card" id="holdings-value-card">
                    <span className="title">Total Value</span>
                    <span className="subtitle" id="holdings-total-value">
                    ...
                    </span>
                </div>
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
                </div>
            </div>
            <div className="page activity" id="page-activity">
                <div className="activity-list-wrapper noselect">
                <div className="headers-wrapper" data-list="activity">
                    <span className="header date" data-item="date">
                    Date
                    </span>
                    <span className="header symbol" data-item="coin">
                    Coin
                    </span>
                    <span className="header amount" data-item="amount">
                    Amount
                    </span>
                    <span className="header type" data-item="type">
                    Type
                    </span>
                    <span className="header notes" data-item="notes">
                    Notes
                    </span>
                </div>
                <div className="activity-list loading" id="activity-list">
                    <div className="event-wrapper loading">
                    <span>Loading...</span>
                    </div>
                </div>
                </div>
                <div className="activity-card-wrapper noselect">
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
                </div>
                <div className="activity-search-wrapper">
                <input type="text" id="activity-search-input" placeholder="Query..." />
                <button id="activity-search-button">Search</button>
                </div>
            </div>
            <div className="page autpage" id="page-autpage">
                <div className="aut-section">
                <p className="aut-title">OXA</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">OXA</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">OXA</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">OXA</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">OXA</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">OXA</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">AUT</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">AUT</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">AUT</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">AUT</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">AUT</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="aut-section">
                <p className="aut-title">AUT</p>
                <div className="autpage-list-wrapper noselect">
                    <div className="headers-wrapper" data-list="autpage">
                    <span className="header name" data-item="name">
                        Name
                    </span>
                    <span className="header cusip" data-item="cusip">
                        CUSIP
                    </span>
                    <span className="header amount" data-item="amount">
                        Amount
                    </span>
                    <span className="header interest" data-item="interest">
                        Interest
                    </span>
                    <span className="header value" data-item="value">
                        Value
                    </span>
                    </div>
                    <div className="autpage-list" id="autpage-list">
                    <div
                        id="autpage-event-0"
                        data-name="Bond A"
                        data-cusip="912797GS0"
                        data-amount={100}
                        data-interest="5.2"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond A</span>
                        <span className="cusip">912797GS0</span>
                        <span className="amount">100</span>
                        <span className="interest">5.2</span>
                        <span className="value">2530</span>
                    </div>
                    <div
                        id="autpage-event-1"
                        data-name="Bond B"
                        data-cusip="912796Y37"
                        data-amount={100}
                        data-interest="2.8"
                        data-value={2530}
                        className="event-wrapper"
                    >
                        <span className="name">Bond B</span>
                        <span className="cusip">912796Y37</span>
                        <span className="amount">100</span>
                        <span className="interest">2.8</span>
                        <span className="value">2530</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="page settings" id="page-settings">
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
                <div className="bottom settings-choices-wrapper" data-key="shareHoldings">
                    <button className="server-choice" data-value="disabled">
                    Disabled
                    </button>
                    <button className="server-choice" data-value="enabled">
                    Enabled
                    </button>
                    <input type="text" placeholder="Access PIN..." id="input-access-pin" />
                    <button className="submit" id="change-pin-button">
                    Confirm PIN
                    </button>
                    <input
                    type="text"
                    placeholder="Sharing URL"
                    id="sharing-url"
                    readOnly=""
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
                    Using Ethplorer, the current balance of the tokens in your ETH wallet
                    can be imported into Cryptofolio. Your Ethereum token holdings would
                    either get added to your current holdings, or would replace them
                    depending on which option you choose. Tokens that aren't listed on
                    CoinGecko would not get added.
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
                    No-API mode data. Since the No-API mode isn't meant for long-term use,
                    there are no protections against the loss of data. If there's no
                    remaining storage, many of Cryptofolio's functions may cease to work
                    right. In such an event, it's recommended to export your data to keep
                    it safe.
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
                <div className="section">
                <div className="top noselect">
                    <span className="title">Default Page</span>
                </div>
                <div className="bottom settings-choices-wrapper" data-key="defaultPage">
                    <button className="choice" data-value="dashboard">
                    Dashboard
                    </button>
                    <button className="choice" data-value="market">
                    Market
                    </button>
                    <button className="choice" data-value="holdings">
                    Holdings
                    </button>
                    <button className="choice" data-value="activity">
                    Activity
                    </button>
                    <button className="choice" data-value="autpage">
                    AUT/OXA
                    </button>
                    <button className="choice" data-value="settings">
                    Settings
                    </button>
                </div>
                </div>
                <div className="section">
                <div className="top noselect">
                    <span className="title">Coin Icon Backdrop</span>
                </div>
                <div className="bottom settings-choices-wrapper" data-key="coinBackdrop">
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
                <div className="section" style={{ marginBottom: 20 }}>
                <div className="top noselect">
                    <span className="title">Historical Data</span>
                </div>
                <div className="bottom">
                    <button className="submit inline" id="delete-cache-button">
                    Delete Cache
                    </button>
                </div>
                </div>
                <div className="section noapi-hidden">
                <div className="top noselect">
                    <span className="title">Mobile App QR Login</span>
                </div>
                <div className="bottom">
                    <button className="submit inline" id="show-qr-code-button">
                    Show QR Code
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}