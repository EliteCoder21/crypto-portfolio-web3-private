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
import CryptoTearsheet from "../components/crypto-tearsheet.js";
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
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
  const [displayCryptoTearsheetPopup, setDisplayCryptoTearsheetPopup] = useState(false);
  const [displayTearsheetPopup, setDisplayTearsheetPopup] = useState(false);
  const [optionsPopupIndex, setOptionsPopupIndex] = useState(-1);
  const [assetOptionsData, setAssetOptionsData] = useState([[],[],[],[]]);

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
    const tableState = [[],[],[],[]];

    let getRow = function(docsSnap, index) {
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
      getRow(await getUserAssetOptions(DEFAULT_USER_ID, "rwa-asset-options"), getLaneIndex("RWA Lane"));
      getRow(await getUserAssetOptions(DEFAULT_USER_ID, "aut-asset-options"), getLaneIndex("AUT Lane"));
      getRow(await getUserAssetOptions(DEFAULT_USER_ID, "oxa-asset-options"), getLaneIndex("OXA Lane"));
      getRow(await getUserAssetOptions(DEFAULT_USER_ID, "dig-asset-options"), getLaneIndex("Dig Lane"));
    } catch (e) {
      console.log(e);
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
            "cardStyle": DEFAULT_CARD_STYLE,
            "description": tempData.description,
            "isConvertedToOXA": tempData.isConvertedToOXA,
            "offer": tempData.offer,
            "component": CustomCard,
          };

          if (!(cardData == {})) {
            eventBus.publish({ type: "ADD_CARD", laneId: lane, card: cardData })
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId) => {
    if (fromLaneId == toLaneId) {
      return;
    }

    let cardData = getSingleAsset(DEFAULT_USER_ID, fromLaneId, cardId);

    try {
      let laneIndex = getLaneIndex(toLaneId)

      if (laneIndex != 0) {
        setOptionsPopupIndex(laneIndex);
      } else {
        setOptionsPopupIndex(-2);
      }

      transferUserAsset(
        DEFAULT_USER_ID,
        fromLaneId,
        toLaneId,
        cardId,
        cardData
      );

      getAssetsData();
    } catch (e) {
      console.log(e);
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
          {card.laneId == "RWA Lane" || card.laneId == "AUT Lane" || card.laneId == "OXA Lane"? (
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
            <div style={{ boxAlign: "center" }}>
              <button
                className="hover-button"
                title="Sheets"
                onClick={() => {
                  setDisplayCryptoTearsheetPopup(!displayCryptoTearsheetPopup);
                }}
              >
                <TearSheetIcon />
              </button>
            </div>
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
      case "RWA Pool - Your Bond's in Custody":
        res = "Add Assets from onboarded RWA's";
        break;
      case "AUT Pool - Asset Unique Tokens":
        res = "Drop here to convert your RWA to OpenEXA AUT";
        break;
      case "Immobilized Collateral - AUT":
        res = "Drop here to get OXA credit for Immobilized AUT";
        break;
      default:
        res = "Your liquid OXA: you can swap with other digital assets"
        break;
    }

    return res;
  }

  function getLaneImage(laneTitle) {
    return (
      <div className="lane-image">
        {laneTitle == "RWA Pool - Your Bond's in Custody" ? (
          <button
            className="add-button"
            onClick={() => {
              setOptionsPopupIndex(0);
            }}
          >
            <AddIcon />
          </button>
        ) : laneTitle == "Digital Assets - In Your Custody" ? (
          <div style={{marginTop: 25}}>
            <MultipleStopOutlinedIcon />
          </div>
        ) : (
          <div style={{marginTop: 50}}>
          <MultipleStopOutlinedIcon />
        </div>
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

  async function processAddRwaAsset(cusip, offer, description) {
    await addUserAsset(DEFAULT_USER_ID, "RWA Lane", cusip, offer, description);
  
    await getAssetsData();
  
    setOptionsPopupIndex(-1);
  }

  const RwaOptionsList = () => {
    return assetOptionsData[0].map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              processAddRwaAsset(cusip, offer, description);
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
          <div className="top" style={{}}>
            <center>
              <span className="title">Select Offer</span>
            </center>
          </div>
          <div className="bottom" style={{ }}>
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
          <div className="bottom">
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
          <div className="bottom">
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

  const TemporaryPopup = () => {
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
        onClick={() => {
          setOptionsPopupIndex(-1);
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            width: "50%",
            height: "90%",
          }}>
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
                right: "10px"
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

  const CryptoTearsheetPopup = () => {
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
            maxHeight: "90%",
            overflowX: "hidden",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 10px"
          }}
        >
          <div className="top">
            <span className="title">Strategy Crypto Tearsheet</span>
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
                setDisplayCryptoTearsheetPopup(false);
              }}
            >
              X
            </button>
          </div>
          <div className="bottom">
            <CryptoTearsheet />
            <button
              className="reject"
              id="popup-cancel"
              onClick={() => {
                setDisplayCryptoTearsheetPopup(!displayCryptoTearsheetPopup);
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
      {optionsPopupIndex == -2 ? (
        <TemporaryPopup />
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
      {displayCryptoTearsheetPopup ? (
        <CryptoTearsheetPopup />
      ) : (
        <></>
      )}
    </div>
  );
}