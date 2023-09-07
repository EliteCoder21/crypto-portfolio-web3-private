import Navbar from "../components/navbar.js";
import Login from "../components/login.js";
import AsyncBoard from "react-trello";
import { useAuthContext } from "../firebase/context";
import React, { useEffect, useState } from "react";


/*<html>
<head>
    <title>Popup Button</title>
</head>
<body>
    <button onclick="openTearsheetPopup()">Open Tearsheet Popup</button>

    <script>
        function openTearsheetPopup() {
            const popupURL = 'components/tearsheet.js';

            const popup = window.open(popupURL, 'tearsheet', 'width=600, height=400');

            if (popup.closed || !popup || typeof popup.closed == 'undefined') {
                console.log("Popup blocked! PLease allow popups for this site");
            }
        }
    </script>
</body>
</html>
*/


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
 