import Navbar from "../components/navbar.js";
import Login from "../components/login.js";
import AsyncBoard from "react-trello";
import { useAuthContext } from "../firebase/context";
import React, { useEffect, useState } from "react";
import addUserActivity, { getUserAssets, transferUserAsset, getSingleAsset } from "../firebase/user.js"
import { collection, getDocs } from "firebase/firestore";
const firebase = require("firebase/app");
require("firebase/firestore");

export default function Assets() {

  // Essential variables
  const { user } = useAuthContext();

  // Populate kanban data
  const data = require("./emptyAssetsData.json");
  getAssetsData("5ntPFGMhxD4llc0ObTwF"); // Replace with user.uid

  // Event Bus for operations
  let eventBus = null;
  const setEventBus = (handle) => {
    eventBus = handle;
  }

  // Helper function
  let getLaneIndex = function(laneName) {
    
    // Default index value
    let res = 0;

    switch(laneName) {
      case "AUT Lane": 
        res = 1;
        break;
      case "OXA Lane":
        res = 2;
        break;
      case "Digital Assets Lane":
        res = 3;
        break;
      default:
        res = 0;
        break;
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

        // Push the data
        laneSnap.forEach((doc) => {
          
          // Read the data
          const tempData = doc.data();

          // Populate new data object
          const cardData = {
            id: tempData.id,
            laneId: tempData.laneId,
            title: tempData.title,
            label: tempData.label,
            cardStyle: { "width": 380, "maxWidth": 380, "margin": "auto", "marginBottom": 5 },
            description: tempData.description
          }

          // Append the data
          eventBus.publish({
            type: "ADD_CARD", 
            laneId: lane, 
            card: cardData
          })        

          // Add to JSON file
          data.lanes[getLaneIndex(lane)].cards.push(cardData);
        });
      }

      eventBus.publish({
        type: "UPDATE_LANES", 
        lanes: data.lanes
      });

      console.log("Current data", data);
      console.log("-------------------------");
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
    let cardData = getSingleAsset("5ntPFGMhxD4llc0ObTwF", fromLaneId.trimStart(), cardId.trimStart());

    console.log("The found card is: ", cardData);
    
    try {
      // Publish to frontend
      eventBus.publish({
        type: "ADD_CARD", 
        laneId: toLaneId, 
        card: cardData
      });
      
      // Add to JSON
      //data.lanes[finalLaneInd].cards.push(cardData);

      // Remove card from previous lane
      eventBus.publish({type: "REMOVE_CARD", laneId: fromLaneId, cardId: cardId})

      // Save changes
      transferUserAsset("5ntPFGMhxD4llc0ObTwF", fromLaneId, toLaneId, cardId, cardData); // Replace with user.id
      getAssetsData();

    } catch (error) {
      console.log(error);
    }
    
  }
  
  const AssetInventory = () => {
    return (
      <div className="bond-data">
        <div className="myAssets">
          <AsyncBoard
            eventBusHandle={setEventBus}
            style={{backgroundColor: "rgba(31, 42, 71, 0)"}}
            data={data}
            onCardMoveAcrossLanes={handleCardMoveAcrossLanes}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      { user ?
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
            <div style={{ width: "80%", margin: "auto" }}>
              <AssetInventory />
            </div>
          </div>
        </div>
        : 
        <Login />
      }
    </div>
  );
}
