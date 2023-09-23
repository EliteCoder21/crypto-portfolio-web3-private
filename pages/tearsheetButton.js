import Tearsheet from "../components/tearsheet";
import React, { useState } from "react";

export default function TearsheetButton() {
  const [displayPopup, setDisplayPopup] = useState(false);

  return (
    <>
      <button
        className="buttonNoStyles"
        onClick={() => {
          setDisplayPopup(!displayPopup);
        }}
      >
        <div className="holdings-add-card" id="holdings-add-card">
          <span className="title">Tearsheet</span>
        </div>
      </button>
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
            style={{ maxWidth: "800px", width: "90%", height: "90%", overflow: "auto" }}
          >
            <div className="top">
              <span className="title">Strategy Tearsheet</span>
              <button
              className="exit-button"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => {
                setDisplayPopup(false);
              }}
            >
              X
            </button>
            </div>

            <div className="bottom">
              <Tearsheet />
              <button
                className="reject"
                id="popup-cancel"
                onClick={() => {
                  setDisplayPopup(!displayPopup);
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}