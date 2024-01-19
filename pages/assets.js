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
  deleteUserAsset,
  getUserAssetOptions,
  getLiquidOxaAmount,
  setLiquidOxaAmount
} from "../firebase/user.js";
import { collection, getDocs } from "firebase/firestore";
import Bar from "../components/bar.js";
import Tearsheet from "../components/tearsheet.js";
import CryptoTearsheet from "../components/crypto-tearsheet.js";
import AddIcon from "@mui/icons-material/Add";
import RelValIcon from "@mui/icons-material/ScatterPlot";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import TearSheetIcon from "@mui/icons-material/Summarize";
import Script from "next/script";
import "reactjs-popup/dist/index.css";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import BitcoinWidget from "../components/bitcoin-widget.js";
import EthereumWidget from "../components/ethereum-widget.js";

let liquidOxaAmount = 1000000;

const lanes = ["RWA Lane", "AUT Lane", "OXA Lane", "OXA2 Lane", "Dig Lane"];

const firebase = require("firebase/app");
require("firebase/firestore");

export default function Assets() {
  const { user } = useAuthContext();

  const [displayRelValPopup, setDisplayRelValPopup] = useState(false);
  const [displayCryptoTearsheetPopup, setDisplayCryptoTearsheetPopup] = useState(false);
  const [displayTearsheetPopup, setDisplayTearsheetPopup] = useState(false);
  const [optionsPopupIndex, setOptionsPopupIndex] = useState(-1);
  const [chosenOption, setChosenOption] = useState("");
  const [assetOptionsData, setAssetOptionsData] = useState([[], [], [], []]);
  const [realLiquidOxaAmount, setRealLiquidOxaAmount] = useState(getLiquidOxaAmount(DEFAULT_USER_ID));

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
    const tableState = [[], [], [], []];

    let getRow = function (docsSnap, index) {
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
      getRow(await getUserAssetOptions(DEFAULT_USER_ID, "oxa-asset-options"), getLaneIndex("OXA2 Lane"));
      getRow(await getUserAssetOptions(DEFAULT_USER_ID, "dig-asset-options"), getLaneIndex("Dig Lane"));
    } catch (e) {
      console.log(e);
    }

    setAssetOptionsData(tableState);
  }

  const data = require("./emptyAssetsData.json");
  getAssetsData(DEFAULT_USER_ID);
  initialize();

  let eventBus = null;
  const setEventBus = (handle) => {
    eventBus = handle;
  };

  async function initialize() {
    return (                  
      <Script defer src="https://www.livecoinwatch.com/static/lcw-widget.js" />
    );
  }

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

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handleCardMoveAcrossLanes(fromLaneId, toLaneId, cardId) {
    if (fromLaneId == toLaneId) {
      return;
    }

    let cardData = await getSingleAsset(DEFAULT_USER_ID, fromLaneId, cardId);

    try {
      let laneIndex = getLaneIndex(toLaneId);

      if (laneIndex == 0) {
        setOptionsPopupIndex(-2);
      } else if (laneIndex == 4) {
        await deleteUserAsset(DEFAULT_USER_ID, fromLaneId, cardId);

        setOptionsPopupIndex(-5);

        await sleep(10);

        setOptionsPopupIndex(-1);

        await setLiquidOxaAmount(getLiquidOxaAmount(DEFAULT_USER_ID) + 10);

        setRealLiquidOxaAmount(getLiquidOxaAmount(DEFAULT_USER_ID));

        liquidOxaAmount += 10;
      } else {
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
          {card.laneId == "RWA Lane" || card.laneId == "AUT Lane" || card.laneId == "OXA Lane" ? (
            <div style={{ boxAlign: "center" }}>
              <button
                className="hover-button"
                title="RelVal"
                onClick={() => {
                  setDisplayRelValPopup(!displayRelValPopup);
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
                <SmartButtonIcon />
              </button>
            </div>
          )}
        </div>

        {card.laneId != "Dig Lane" ? (
          <div className="react-trello-card-body">
            <p>{card.description}</p>
            <div className="progress">
              <p>&#9680; In Progress</p>
            </div>
          </div>
        ) : (
          <>
            <div className="react-trello-card-body">
              <Script defer src="https://www.livecoinwatch.com/static/lcw-widget.js" />
            </div>
          </>
        )};
      </div>
    );
  };

  function getLaneSubtitle(laneId) {
    let res;

    switch (laneId) {
      case "RWA Lane":
        res = "Add Onboarded Bonds";
        break;
      case "AUT Lane":
        res = "Drop here to convert to AUT";
        break;
      case "OXA Lane":
        res = "Drop here to immobilize the AUT";
        break;
      case "OXA2 Lane":
        res = "Drop here to get credit for AUT's"
        break;
      case "Dig Lane":
        res = "Convert back to OXA/AUT/RWA"
      default:
        break;
    }

    return res;
  }

  function getLaneImage(laneId) {
    return (
      <div className="lane-image">
        {laneId == "RWA Lane" ? (
          <div style={{ marginTop: -8 }}>
            <button
              className="add-button"
              onClick={() => {
                setOptionsPopupIndex(0);
              }}
            >
              <AddIcon />
            </button>
          </div>
        ) : (
          <div>
            {laneId == "Dig Lane" ? (
              <div style={{ marginTop: 40, width: "90%" }}>
                <AccountBalanceWalletIcon />
              </div>
            ) : (
              <div style={{ marginTop: 40, marginRight: 5 }}>
                <svg
                  width={30}
                  height={20}
                  className="m-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  const CustomLaneHeader = (lane) => {
    return (
      <center>
        <div className="custom-lane-header">
          <center>
            <div style={{ width: "100%", fontSize: 20, margin: 0, marginBottom: 5, padding: 0, whiteSpace: "normal" }}>
              {lane.title}
            </div>
            <div className="lane-subtitle">
              <p style={{ fontSize: 16 }}>{getLaneSubtitle(lane.id)}</p>
              <center>
                {getLaneImage(lane.id)}
              </center>
            </div>
            {lane.id == "Dig Lane" ? (
              <div>
                <div className="Uniswap">
                  <SwapWidget />
                </div>
                <div>
                  <BitcoinWidget />
                  <EthereumWidget />
                  <BitcoinWidget />
                </div>
              </div>
            ) : (
              <></>
            )}
          </center>
        </div>
      </center>
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
        <div className="board-data-container">
          <div className="bond-data">
            <div
              style={{
                backgroundColor: "rgba(32, 34, 50, 0.55)",
                borderRadius: 20,
                width: "100%",
                paddingBottom: 10,
                overflowY: "auto"
              }}
            >
              <Board
                eventBusHandle={setEventBus}
                style={{
                  backgroundColor: "rgba(31, 42, 71, 0)",
                  overflowY: "auto" //scroll: columns extend all the way down and can see all cards
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
          position: "fixed",
          zIndex: 100,
          top: 50,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            width: "50%",
            height: "60%",
          }}>
          <div className="top">
            <center>
              <span className="title">Select Offer</span>
              <button
                className="exit-button"
                style={{
                  float: "right",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => {
                  setOptionsPopupIndex(-1);
                }}
              >
                X
              </button>
            </center>
          </div>
          <div className="bottom">
            <RwaOptionsList />
          </div>
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

              setChosenOption(offer);

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
          top: 50,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            width: "50%",
            height: "60%",
          }}>
          <div className="top">
            <center>
              <span className="title">Select Offer</span>
              <button
                className="exit-button"
                style={{
                  float: "right",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => {
                  setOptionsPopupIndex(-4);
                }}
              >
                X
              </button>
            </center>
          </div>
          <div className="bottom">
            <AutOptionsList />
          </div>
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

              setChosenOption(offer);

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
          top: 50,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            width: "50%",
            height: "60%",
          }}>
          <div className="top">
            <center>
              <span className="title">Select Offer</span>
              <button
                className="exit-button"
                style={{
                  float: "right",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => {
                  setOptionsPopupIndex(-1);
                }}
              >
                X
              </button>
            </center>
          </div>
          <div className="bottom">
            <OxaOptionsList />
          </div>
        </div>
      </div>
    );
  };

  const Oxa2OptionsList = () => {
    return assetOptionsData[2].map(({ id, cusip, offer, description }) => {
      return (
        <div>
          <button
            className="reject"
            id="popup-cancel"
            onClick={() => {
              setOptionsPopupIndex(-1);

              setChosenOption(offer);

              getAssetsData();
            }}
          >
            {offer}
          </button>
        </div>
      );
    });
  };

  const Oxa2OptionsPopup = () => {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          top: 50,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            width: "50%",
            height: "60%",
          }}>
          <div className="top">
            <center>
              <span className="title">Select Offer</span>
              <button
                className="exit-button"
                style={{
                  float: "right",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => {
                  setOptionsPopupIndex(-1);
                }}
              >
                X
              </button>
            </center>
          </div>
          <div className="bottom">
            <Oxa2OptionsList />
          </div>
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

              setChosenOption(offer);

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
          top: 50,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            width: "50%",
            height: "60%",
          }}>
          <div className="top">
            <center>
              <span className="title">Select Offer</span>
              <button
                className="exit-button"
                style={{
                  float: "right",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => {
                  setOptionsPopupIndex(-1);
                }}
              >
                X
              </button>
            </center>
          </div>
          <div className="bottom">
            <DigOptionsList />
          </div>
        </div>
      </div>
    );
  };

  const EmptyPopup = () => {
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
              <span className="title">Loading...</span>
              <button
                className="exit-button"
                style={{
                  float: "right",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => {
                  setOptionsPopupIndex(-1);
                }}
              >
                X
              </button>
            </center>
          </div>
          <div className="bottom">

          </div>
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
          <div className="bottom">
            <RwaOptionsList />
          </div>
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
          backgroundColor: "rgba(32, 34, 50, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
        }}
        onClick={() => {
          setDisplayRelValPopup(!displayRelValPopup);
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            maxWidth: "150%",
            maxHeight: "150%",
            width: "95%",
            width: "90vh",
            width: "90%",
            height: "90vh",
            overflow: "auto",
            border: "4px solid #30CCF6",
            borderRadius: "20px",
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
                setDisplayRelValPopup(false);
              }}
            >
              X
            </button>
          </div>
          <div className="bottom" style={{ height: "92%" }}>
            <iframe
              src="https://react-relval-wmn5n7rc5q-uc.a.run.app/"
              width="100%"
              height="99%"
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
          backgroundColor: "rgba(32, 34, 50, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
        }}
      >
        <div
          className="popup-wrapper active"
          style={{
            maxWidth: "100%",
            width: "50%",
            height: "90%",
            overflow: "auto",
            border: "4px solid #30CCF6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
          }}
          onClick={() => {
            setDisplayTearsheetPopup(!displayTearsheetPopup);
          }}
        >
          <div className="top" style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="title">Strategy Tearsheet</span>
            <button
              className="exit-button"
              style={{
                marginRight: "10px",
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

    if (chosenOption != "") {
      console.log("chosenOption " + chosenOption);

      // Process chosen asset option
    }
  }, []);

  return (
    <div style={{ overflowY: "scroll" }}>
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
      {optionsPopupIndex == getLaneIndex("OXA2 Lane") ? (
        <DigOptionsPopup />
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
      {optionsPopupIndex == -5 ? (
        <EmptyPopup />
      ) : (
        <></>
      )}
      {displayRelValPopup ? (
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