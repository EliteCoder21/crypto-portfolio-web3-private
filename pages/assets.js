import Navbar from "../components/navbar.js";
import Login from "../components/login.js";
import Board from "react-trello";
import { useAuthContext } from "../firebase/context";
import React, { useState } from "react";
import { DEFAULT_CARD_STYLE, getUserAssets, transferUserAsset, getSingleAsset } from "../firebase/user.js"
import { collection, getDocs } from "firebase/firestore";
import Bar from "../components/bar.js";
import Tearsheet from "../components/tearsheet.js"
import "reactjs-popup/dist/index.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddIcon from "@mui/icons-material/Add"


const lanes = ["RWA Lane", "AUT Lane", "OXA Lane", "Digital Assets Lane"];
const firebase = require("firebase/app");
require("firebase/firestore");

export default function Assets() {

  const { user } = useAuthContext();

  const [displayOptionsPopup, setDisplayOptionsPopup] = useState(false);
  const [displayRelVal, setDisplayRelVal] = useState(false);
  const [displayTearsheetPopup, setDisplayTearsheetPopup] = useState(false);

  // Populate Kanban data
  const data = require("./emptyAssetsData.json");
  getAssetsData("5ntPFGMhxD4llc0ObTwF"); // Replace with user.uid

  // Event Bus for operations
  let eventBus = null;
  const setEventBus = (handle) => {
    eventBus = handle;
  }

  // Helper function
  let getLaneIndex = function (laneName) {

    // Default index value
    let res = 0;

    for (let i = 0; i < lanes.length; i++) {
      if (lanes[i] === laneName) {
        res = i;
        break;
      }
    }

    return res;
  }

  // Get data
  async function getAssetsData() {
    try {

      // Base Firebase reference
      const userDataRef = await getUserAssets("5ntPFGMhxD4llc0ObTwF"); //Replace with user.uid

      // Iterate across all lanes
      for (let lane of ["RWA Lane", "AUT Lane", "OXA Lane", "Digital Assets Lane"]) {

        // Update lane
        const laneCollection = collection(userDataRef, lane);
        const laneSnap = await getDocs(laneCollection);

        // Clear lane
        data.lanes[getLaneIndex(lane)].cards = [];

        // Push data
        laneSnap.forEach((doc) => {

          // Read data
          const tempData = doc.data();

          // Populate new data object
          const cardData = {
            id: tempData.id,
            laneId: tempData.laneId,
            title: tempData.title,
            label: tempData.label,
            cardStyle: DEFAULT_CARD_STYLE,
            description: tempData.description,
            isConvertedToOXA: tempData.isConvertedToOXA,
            component: CustomCard,
          }

          // Add to JSON file
          if (!(cardData == {})) {
            data.lanes[getLaneIndex(lane)].cards.push(cardData);
          }

        });
      }

      // Publish JSON Data
      eventBus.publish({ type: "UPDATE_LANES", lanes: data.lanes });

    } catch (error) {
      console.log(error);
    }
  }

  // Define the Board functions
  const handleCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId) => {

    // If the card stays in the same aisle, stop
    if (fromLaneId === toLaneId) {
      return;
    }

    // Get an individual record
    let cardData = getSingleAsset("5ntPFGMhxD4llc0ObTwF", fromLaneId, cardId);

    try {

      setDisplayOptionsPopup(true);

      transferUserAsset("5ntPFGMhxD4llc0ObTwF", fromLaneId, toLaneId, cardId, cardData); // Replace with user.id
    } catch (error) {
      console.log(error);
    }
  }

  // Create a custom card component.
  const CustomCard = (card) => {
    return (
      <div className="react-trello-card" style={{ backgroundColor: card.style.backgroundColor }}>
        <div className="react-trello-card-header">
          <h3 className="react-trello-card-title">{card.title}</h3>
          <span className="react-trello-card-label">{card.label}</span>
        </div>
        <div className="react-trello-card-body">
          <p>{card.description}</p>
        </div>
        <div>
          <button onClick={() => { setDisplayRelVal(!displayRelVal) }} className="red-hover-button">
            RelVal
          </button>
          <button className="green-hover-button" onClick={() => { setDisplayTearsheetPopup(!displayTearsheetPopup) }}>
            Tear Sheet
          </button>
        </div>
      </div>
    );
  };

  function getLaneSubtitle(laneTitle) {
    let res;

    switch (laneTitle) {
      case "RWA Pool":
        res = "Add your Asset to your OpenEXA RWA - AUT pool";
        break;
      case "AUT Pool":
        res = "Drop here to convert your RWA into OpenEXA AUT Offers";
        break;
      case "OXA Pool":
        res = "Drop here for offers to convert your AUT into OXAs";
        break;
      default:
        res = "Drop here to convert your OXAs into digital assets";
        break;
    }

    return res;
  }

  function getLaneImage(laneTitle) {
    return (
      <div className="lane-image">
        {laneTitle == "RWA Pool" ? <AddIcon /> : <SwapHorizIcon />}
      </div>
    );
  }

  const CustomLaneHeader = (lane) => {

    return (
      <div className="custom-lane-header">
        <center>
          <h1 style={{ fontSize: 20, margin: 0, marginBottom: 5, padding: 0 }}>
            {lane.title}
          </h1>
          <div className="lane-subtitle">
            <center><p style={{ fontSize: 16 }}>{getLaneSubtitle(lane.title)}</p></center>
            {getLaneImage(lane.title)}
          </div>
        </center>
      </div>
    );
  }

  const AssetInventory = () => {
    return (
      <div className="bond-data">
        <div className="myAssets">
          <Board
            eventBusHandle={setEventBus}
            style={{ backgroundColor: "rgba(31, 42, 71, 0)" }}
            data={data}
            onCardMoveAcrossLanes={handleCardMoveAcrossLanes}
            components={{
              LaneHeader: CustomLaneHeader,
              Card: CustomCard
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {user ?
        <div>
          <Navbar active="/assets" />
          <div className="page autpage active" id="page-autpage">
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
              Asset Inventory
            </h1>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Bar />
            </div>
            <div style={{ width: "80%", margin: "auto" }}>
              <AssetInventory />
            </div>
          </div>
        </div>
        :
        <Login />
      }
      {displayOptionsPopup ? (
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
            style={{ width: "50%", height: "90%", overflow: "auto" }}
          >
            <div className="top">
              <center>
                <span className="title">
                  Choose New Asset
                </span>
              </center>
            </div>
            <div className="bottom">
              <button
                className="reject"
                id="popup-cancel"
                onClick={() => {
                  setDisplayOptionsPopup(!displayOptionsPopup);
                }}
              >
                Option 1
              </button>
              <br />
              <button
                className="reject"
                id="popup-cancel"
                onClick={() => {
                  setDisplayOptionsPopup(!displayOptionsPopup);
                }}
              >
                Option 2
              </button>
              <br />
              <button
                className="reject"
                id="popup-cancel"
                onClick={() => {
                  setDisplayOptionsPopup(!displayOptionsPopup);
                }}
              >
                Option 3
              </button>
              <br />
              <button
                className="reject"
                id="popup-cancel"
                onClick={() => {
                  setDisplayOptionsPopup(!displayOptionsPopup);
                }}
              >
                Option 4
              </button>
              <br />
              <button
                className="reject"
                id="popup-cancel"
                onClick={() => {
                  setDisplayOptionsPopup(!displayOptionsPopup);
                }}
              >
                Option 5
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {displayTearsheetPopup ? (
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
                  setDisplayTearsheetPopup(false);
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
                  setDisplayTearsheetPopup(!displayTearsheetPopup);
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
    </div>);
}