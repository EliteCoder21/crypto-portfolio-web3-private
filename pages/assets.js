import Navbar from "../components/navbar.js";
import Login from "../components/login.js";
import Board from "react-trello";
import { useAuthContext } from "../firebase/context";
import React, { useState, useEffect } from "react";
import {
  DEFAULT_USER_ID,
  DEFAULT_CARD_STYLE,
  getUserAssets,
  transferUserAsset,
  getSingleAsset,
  addUserAsset,
  getUserAssetOptions
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

const lanes = ["RWA Lane", "AUT Lane", "OXA Lane", "Dig Lane"];

const firebase = require("firebase/app");
require("firebase/firestore");

export default function Assets() {
  const { user } = useAuthContext();

  const [displayRelVal, setDisplayRelVal] = useState(false);
  const [displayTearsheetPopup, setDisplayTearsheetPopup] = useState(false);
  const [optionsPopupIndex, setOptionsPopupIndex] = useState(-1);
  const [assetOptionsData, setAssetOptionsData] = useState([[],
                                                            [],
                                                            [],
                                                            []]);

  let getLaneIndex = function (laneName) {
    let res = -1;

    for (let index = 0; index < lanes.length; index++) {
      if (lanes[index] == laneName) {
        res = index;
        break;
      }
    }

    return res;
  };

  async function getAssetOptionsData() {
    const tableState = [[], 
                        [], 
                        [], 
                        []];

    let helperFunction = function(docsSnap, index) {
      docsSnap.forEach((doc) => {
        const data = doc.data();

        tableState[index].push({
          id: data.id,
          cusip: data.cusip,
          offer: data.offer,
          description: data.description
        });
      });
    }

    try {
      helperFunction(await getUserAssetOptions(DEFAULT_USER_ID, "rwa-asset-options"), getLaneIndex("RWA Lane"));
      helperFunction(await getUserAssetOptions(DEFAULT_USER_ID, "aut-asset-options"), getLaneIndex("AUT Lane"));
      helperFunction(await getUserAssetOptions(DEFAULT_USER_ID, "oxa-asset-options"), getLaneIndex("OXA Lane"));
      helperFunction(await getUserAssetOptions(DEFAULT_USER_ID, "dig-asset-options"), getLaneIndex("Dig Lane"));
    } catch (error) {
      console.log(error);
    }

    setAssetOptionsData(tableState);
  }

  const data = require("./emptyAssetsData.json");
  getAssetsData(DEFAULT_USER_ID);

  let eventBus = null;
  const setEventBus = (handle) => {
    eventBus = handle;
  };

  async function getAssetsData() {
    try {
      const userDataRef = await getUserAssets(DEFAULT_USER_ID);

      for (let lane of lanes) {
        const laneCollection = collection(userDataRef, lane);
        const laneSnap = await getDocs(laneCollection);

        data.lanes[getLaneIndex(lane)].cards = [];

        laneSnap.forEach((doc) => {
          const tempData = doc.data();

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

          if (!(cardData == {})) {
            eventBus.publish({ type: "ADD_CARD", laneId: lane, card: cardData })
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId) => {
    if (fromLaneId == toLaneId) {
      return;
    }

    let cardData = getSingleAsset(DEFAULT_USER_ID, fromLaneId, cardId);

    try {
      let laneIndex = getLaneIndex(toLaneId)

      if (laneIndex  != 0) {
        setOptionsPopupIndex(laneIndex);
      }

      transferUserAsset(
        DEFAULT_USER_ID,
        fromLaneId,
        toLaneId,
        cardId,
        cardData
      );

      getAssetsData();
    } catch (error) {
      console.log(error);
    }
  };


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

        {card.laneId != "Dig Lane" ? (
          <div className="react-trello-card-body">
            {/* <p style={{ wordWrap: "break-word", flexShrink: 1 }}>{card.description}</p> */}
            <p style={{}}>{card.description}</p>
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
              setOptionsPopupIndex(0);
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
    return assetOptionsData[0].map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              setOptionsPopupIndex(-1);

              addUserAsset(DEFAULT_USER_ID, id, "RWA Lane", cusip, description);

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
              setOptionsPopupIndex(-1);
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  };

  const AutOptionsList = () => {
    return assetOptionsData[1].map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              setOptionsPopupIndex(-1);

              addUserAsset(DEFAULT_USER_ID, id, "AUT Lane", cusip, offer, description);

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
              setOptionsPopupIndex(-1);
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  };

  const OxaOptionsList = () => {
    return assetOptionsData[2].map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              setOptionsPopupIndex(-1);

              addUserAsset(DEFAULT_USER_ID, id, "OXA Lane", cusip, offer, description);

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
              setOptionsPopupIndex(-1);
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  };

  const DigOptionsList = () => {
    return assetOptionsData[3].map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              setOptionsPopupIndex(-1);

              addUserAsset(DEFAULT_USER_ID, id, "Dig Lane", cusip, offer, description);

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
              setOptionsPopupIndex(-1);
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
      {optionsPopupIndex == getLaneIndex("RWA Lane") ? (
        <RwaOptionsPopup />
      ) : (
        <></>
      )}
      {optionsPopupIndex == getLaneIndex("AUT Lane") ? (
        <AutOptionsPopup />
      ) : (
        <></>
      )}
      {optionsPopupIndex == getLaneIndex("OXA Lane") ? (
        <OxaOptionsPopup />
      ) : (
        <></>
      )}
      {optionsPopupIndex == getLaneIndex("Dig Lane") ? (
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