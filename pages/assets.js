import Navbar from "../components/navbar.js";
import Login from "../components/login.js";
import Board from "react-trello";
import { useAuthContext } from "../firebase/context";
import React, { useState, useEffect } from "react";
import {
  DEFAULT_CARD_STYLE,
  getUserAssets,
  transferUserAsset,
  getSingleAsset,
  getRwaAssetOptions,
  addUserRwaAsset,
  getAutAssetOptions,
  addUserAutAsset,
  getOxaAssetOptions,
  addUserOxaAsset,
  getDigAssetOptions,
  addUserDigAsset
} from "../firebase/user.js";
import { collection, getDocs } from "firebase/firestore";
import Bar from "../components/bar.js";
import Tearsheet from "../components/tearsheet.js";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddIcon from "@mui/icons-material/Add";
import RelValIcon from "@mui/icons-material/ScatterPlot";
import InProgressIcon from "@mui/icons-material/HourglassEmpty";
import TearSheetIcon from "@mui/icons-material/Summarize";
import "reactjs-popup/dist/index.css";

const lanes = ["RWA Lane", "AUT Lane", "OXA Lane", "Digital Assets Lane"];
const firebase = require("firebase/app");
require("firebase/firestore");

export default function Assets() {
  const { user } = useAuthContext();

  const [displayRelVal, setDisplayRelVal] = useState(false);
  const [displayTearsheetPopup, setDisplayTearsheetPopup] = useState(false);
  const [displayRwaOptionsPopup, setDisplayRwaOptionsPopup] = useState(false);
  const [rwaAssetOptionsData, setRwaAssetOptionsData] = useState([]);
  const [displayOxaOptionsPopup, setDisplayOxaOptionsPopup] = useState(false);
  const [oxaAssetOptionsData, setOxaAssetOptionsData] = useState([]);
  const [displayAutOptionsPopup, setDisplayAutOptionsPopup] = useState(false);
  const [autAssetOptionsData, setAutAssetOptionsData] = useState([]);
  const [displayDigOptionsPopup, setDisplayDigOptionsPopup] = useState(false);
  const [digAssetOptionsData, setDigAssetOptionsData] = useState([]);

  async function getRwaAssetOptionsData() {
    try {
      const docsSnap = await getRwaAssetOptions("5ntPFGMhxD4llc0ObTwF"); // Replace with user.uid
      const TABLE_STATE = [];

      docsSnap.forEach((doc) => {
        // Get the data
        const data = doc.data();

        // Append the data
        TABLE_STATE.push({
          id: data.id,
          cusip: data.cusip,
          offer: data.offer,
          description: data.description
        });
      });

      setRwaAssetOptionsData(TABLE_STATE);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAutAssetOptionsData() {
    try {
      const docsSnap = await getAutAssetOptions("5ntPFGMhxD4llc0ObTwF"); // Replace with user.uid
      const TABLE_STATE = [];

      docsSnap.forEach((doc) => {
        // Get the data
        const data = doc.data();

        // Append the data
        TABLE_STATE.push({
          id: data.id,
          cusip: data.cusip,
          offer: data.offer,
          description: data.description
        });
      });

      setAutAssetOptionsData(TABLE_STATE);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOxaAssetOptionsData() {
    try {
      const docsSnap = await getOxaAssetOptions("5ntPFGMhxD4llc0ObTwF"); // Replace with user.uid
      const TABLE_STATE = [];

      docsSnap.forEach((doc) => {
        // Get the data
        const data = doc.data();

        // Append the data
        TABLE_STATE.push({
          id: data.id,
          cusip: data.cusip,
          offer: data.offer,
          description: data.description
        });
      });

      setOxaAssetOptionsData(TABLE_STATE);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDigAssetOptionsData() {
    try {
      const docsSnap = await getDigAssetOptions("5ntPFGMhxD4llc0ObTwF"); // Replace with user.uid
      const TABLE_STATE = [];

      docsSnap.forEach((doc) => {
        // Get the data
        const data = doc.data();

        // Append the data
        TABLE_STATE.push({
          id: data.id,
          cusip: data.cusip,
          offer: data.offer,
          description: data.description
        });
      });

      setDigAssetOptionsData(TABLE_STATE);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAssetOptionsData() {
    getRwaAssetOptionsData();
    getAutAssetOptionsData();
    getOxaAssetOptionsData();
    getDigAssetOptionsData();
  }

  // Populate Kanban data
  const data = require("./emptyAssetsData.json");
  getAssetsData("5ntPFGMhxD4llc0ObTwF"); // Replace with user.uid

  // Event Bus for operations
  let eventBus = null;
  const setEventBus = (handle) => {
    eventBus = handle;
  };

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
  };

  // Get data
  async function getAssetsData() {
    try {
      // Base Firebase reference
      const userDataRef = await getUserAssets("5ntPFGMhxD4llc0ObTwF"); // Replace with user.uid

      // Iterate across all lanes
      for (let lane of [
        "RWA Lane",
        "AUT Lane",
        "OXA Lane",
        "Digital Assets Lane",
      ]) {
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
            "id": tempData.id,
            "laneId": tempData.laneId,
            "title": tempData.title,
            "cusip": tempData.cusip,
            "label": tempData.label,
            "cardStyle": DEFAULT_CARD_STYLE,
            "description": tempData.description,
            "isConvertedToOXA": tempData.isConvertedToOXA,
            "component": CustomCard,
          };

          // Add to JSON file
          if (!(cardData == {})) {
            eventBus.publish({ type: "ADD_CARD", laneId: lane, card: cardData })
            //data.lanes[getLaneIndex(lane)].cards.push(cardData);
          }
        });
      }

      // Publish JSON Data
      //eventBus.publish({ type: "UPDATE_LANES", lanes: data.lanes });
    } catch (e) {
      console.log(e);
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
      switch (toLaneId) {
        case "AUT Lane":
          setDisplayAutOptionsPopup(true);
          break;
        case "OXA Lane":
          setDisplayOxaOptionsPopup(true);
          break;
        case "Digital Assets Lane":
          setDisplayDigOptionsPopup(true);
          break;
        default:
          break;
      }

      transferUserAsset(
        "5ntPFGMhxD4llc0ObTwF",
        fromLaneId,
        toLaneId,
        cardId,
        cardData
      ); // Replace with user.id

      // Refresh the data
      getAssetsData();
    } catch (error) {
      console.log(error);
    }
  };


  // Create a custom card component.
  const CustomCard = (card) => {
    return (
      <div
        className="react-trello-card"
        style={{
          backgroundColor: card.style.backgroundColor
        }}
      >
        <div className="react-trello-card-header">
          <h3 className="react-trello-card-title">{card.title}</h3>
          {card.laneId == "RWA Lane" || card.laneId == "AUT Lane" ? (
            <div style={{ boxAlign: "center" }}>
              <button
                className="hover-button"
                title="RelVal"
                onClick={() => {
                  setDisplayRelVal(!displayRelVal);
                }}
              >
                <RelValIcon />
              </button>
              <button
                className="hover-button"
                title="Sheets"
                onClick={() => {
                  setDisplayTearsheetPopup(!displayTearsheetPopup);
                }}
              >
                <TearSheetIcon />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        {card.laneId != "Digital Assets Lane" ? (
          <div className="react-trello-card-body">
            {/* <p style={{ wordWrap: "break-word", flexShrink: 1 }}>{card.description}</p> */}
            <p style={{ fontSize: "78%" }}>{card.description}</p>
            <div className="progress">
              <InProgressIcon />
            </div>
          </div>
        ) : (
          <div>
            Mouse cat fish
            <script src="https://price-static.crypto.com/latest/public/static/widget/index.js"></script>
            <div
              id="crypto-widget-CoinList"
              data-design="classic"
              data-coin-ids="1">
            </div>
          </div>
        )};
      </div>
    );
  };



  function getLaneSubtitle(laneTitle) {
    let res;

    switch (laneTitle) {
      case "RWA Pool":
        res = "Add Real-World Assets (RWAs) here";
        break;
      case "AUT Pool":
        res = "Drop here to convert your RWA tokens into AUTs";
        break;
      case "OXA Pool":
        res = "Drop here to convert your AUT into OXAs";
        break;
      default:
        res = "Drop here to convert your OXAs into Digital Assets"
        break;
    }

    return res;
  }

  function getLaneImage(laneTitle) {
    return (
      <div className="lane-image">
        {laneTitle == "RWA Pool" ? (
          <button
            className="add-button"
            onClick={() => {
              setDisplayRwaOptionsPopup(true);
            }}
          >
            <AddIcon />
          </button>
        ) : (
          <SwapHorizIcon />
        )}
      </div>
    );
  }

  const CustomLaneHeader = (lane) => {
    return (
      <div className="custom-lane-header">
        <center>
          <div style={{ fontSize: 20, margin: 0, marginBottom: 5, padding: 0 }}>
            {lane.title}
          </div>
          <div className="lane-subtitle">
            <center>
              <p style={{ fontSize: 16 }}>{getLaneSubtitle(lane.title)}</p>
            </center>
            <center>
              {getLaneImage(lane.title)}
            </center>
          </div>
        </center>
      </div>
    );
  };

  const AssetInventory = () => {
    return (

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
        <div
          style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="bond-data">
            <div
              style={{
                backgroundColor: "rgba(32, 34, 50, 0.55)",
                borderRadius: 20,
                width: "100%",
                height: "100%",
              }}
            >
              <Board
                eventBusHandle={setEventBus}
                style={{
                  backgroundColor: "rgba(31, 42, 71, 0)",
                  width: "100%",
                  height: "500%"
                }}
                data={data}
                onCardMoveAcrossLanes={handleCardMoveAcrossLanes}
                components={{
                  LaneHeader: CustomLaneHeader,
                  Card: CustomCard,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RwaOptionsList = () => {
    return rwaAssetOptionsData.map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              setDisplayRwaOptionsPopup(false);

              console.log("card with id " + id + " chosen");

              // Write to firebase
              addUserRwaAsset("5ntPFGMhxD4llc0ObTwF", id, cusip, offer, description);

              // Update page using new data
              getAssetsData();
            }}
          >
            {offer}
          </button>
        </div>
      );
    });
  };

  const RwaOptionsPopup = () => {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            width: "45%",
            height: "100%",
            overflow: "auto"
          }}>
          <div className="top">
            <center>
              <span className="title">Select Offer</span>
            </center>
          </div>
          <div className="bottom" style={{ border: "4px solid #30CCF6" }}>
            <RwaOptionsList />
          </div>
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
              setDisplayRwaOptionsPopup(false);
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  };

  const AutOptionsList = () => {
    return autAssetOptionsData.map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              setDisplayAutOptionsPopup(false);

              console.log("card with id " + id + " chosen");

              // Write to firebase
              addUserAutAsset("5ntPFGMhxD4llc0ObTwF", id, cusip, offer, description);

              // Update page using new data
              getAssetsData();
            }}
          >
            {offer}
          </button>
        </div>
      );
    });
  };

  const AutOptionsPopup = () => {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            width: "50%",
            height: "90%",
            overflow: "auto"
          }}>
          <div className="top">
            <center>
              <span className="title">Select Offer</span>
            </center>
          </div>
          <div className="bottom" style={{ border: "4px solid #30CCF6" }}>
            <AutOptionsList />
          </div>
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
              setDisplayAutOptionsPopup(false);
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  };

  const OxaOptionsList = () => {
    return oxaAssetOptionsData.map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              setDisplayOxaOptionsPopup(false);

              console.log("card with id " + id + " chosen");

              // Write to firebase
              addUserOxaAsset("5ntPFGMhxD4llc0ObTwF", id, cusip, offer, description);

              // Update page using new data
              getAssetsData();
            }}
          >
            {offer}
          </button>
        </div>
      );
    });
  };

  const OxaOptionsPopup = () => {
    return (
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
          style={{
            width: "50%",
            height: "90%",
          }}>
          <div className="top">
            <center>
              <span className="title">Select Offer</span>
            </center>
          </div>
          <div className="bottom" style={{ border: "4px solid #30CCF6" }}>
            <OxaOptionsList />
          </div>
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
              setDisplayOxaOptionsPopup(false);
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  };

  const DigOptionsList = () => {
    return digAssetOptionsData.map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              setDisplayDigOptionsPopup(false);

              console.log("card with id " + id + " chosen");

              // Write to firebase
              addUserDigAsset("5ntPFGMhxD4llc0ObTwF", id, cusip, offer, description);

              // Update page using new data
              getAssetsData();
            }}
          >
            {offer}
          </button>
        </div>
      );
    });
  };

  const DigOptionsPopup = () => {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            width: "50%",
            height: "90%",
            overflow: "auto"
          }}>
          <div className="top">
            <center>
              <span className="title">Select Offer</span>
            </center>
          </div>
          <div className="bottom" style={{ border: "4px solid #30CCF6" }}>
            <DigOptionsList />
          </div>
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
              setDisplayDigOptionsPopup(false);
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  };

  const RelValPopup = () => {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            maxWidth: "800px",
            width: "95%",
            width: "90vh",
            width: "90%",
            height: "90vh",
            overflow: "auto",
            border: "4px solid #30CCF6",
          }}
        >
          <div className="top">
            <span className="title">Relative Value</span>
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
                setDisplayRelVal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="bottom" style={{ height: "80%" }}>
            <iframe
              src="https://react-relval-wmn5n7rc5q-uc.a.run.app/"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const TearsheetPopup = () => {
    return (
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
          style={{
            maxWidth: "none",
            width: "90%",
            height: "90%",
            overflow: "auto",
            border: "4px solid #30CCF6",
            display: "flex",
            flexDirection: "column",
            alighItems: "denter"
          }}
        >
          <div className="top">
            <span className="title">Strategy Tearsheet</span>
            <button
              className="exit-button"
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "white",
                position: "absolute",
                top: "10px",
                left: "10px"
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
    );
  };

  useEffect(() => {
    getAssetOptionsData();
  }, []);

  return (
    <div>
      <head>
        <script defer src="https://www.livecoinwatch.com/static/lcw-widget.js"></script>
      </head>
      {user ? (
        <div>
          <Navbar active="/assets" />
          <AssetInventory />
        </div>
      ) : (
        <Login />
      )}
      {displayRwaOptionsPopup ? (
        <RwaOptionsPopup />
      ) : (
        <></>
      )}
      {displayAutOptionsPopup ? (
        <AutOptionsPopup />
      ) : (
        <></>
      )}
      {displayOxaOptionsPopup ? (
        <OxaOptionsPopup />
      ) : (
        <></>
      )}
      {displayDigOptionsPopup ? (
        <DigOptionsPopup />
      ) : (
        <></>
      )}
      {displayRelVal ? (
        <RelValPopup />
      ) : (
        <></>
      )}
      {displayTearsheetPopup ? (
        <TearsheetPopup />
      ) : (
        <></>
      )}
    </div>
  );
}
