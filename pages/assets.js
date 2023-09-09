import Navbar from "../components/navbar.js";
import Login from "../components/login.js";
import AsyncBoard from "react-trello";
import { useAuthContext } from "../firebase/context";
import React, { useEffect, useState } from "react";
import addUserActivity, { getUserAssets, transferUserAsset } from "../firebase/user.js"
import { collection, getDocs } from "firebase/firestore";

export default function Assets() {

  // Essential Variables
  const { user } = useAuthContext();

  // Populate kanban data
  const data = require("./kanbanTestData.json");
  getAssetsData(user.uid);

  // Event Bus for operations
  let eventBus = null;
  const setEventBus = (handle) => {
    eventBus = handle;
  }

  // Helper function
  let getLaneIndex = function(laneName) {
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

  // Get Data
  async function getAssetsData() {
    try {
      
      // Base Firebase reference
      const userDataRef = await getUserAssets("5ntPFGMhxD4llc0ObTwF"); //Replace with user.uid

      // Iterate across all lanes
      for (let lane of ["RWA Lane", "AUT Lane", "OXA Lane", "Digital Assets Lane"]) {
        
        // Update lane
        const laneCollection = collection(userDataRef, lane);
        const laneSnap = await getDocs(laneCollection);

        // Push the data
        laneSnap.forEach((doc) => {
          // Get the data
          const tempData = doc.data();
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

      console.log("The final updated data is:")
      console.log(data);

    } catch (error) {
      console.log(error);
      console.log("IT DIDN'T WORK!")
    }
  }

  // Define the Board functions
  const handleCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId) => {

    // If the card stays in the same aisle, stop
    if (fromLaneId === toLaneId) {
      return;
    }
    
    console.log("start: ", fromLaneId);
    console.log("end: ", toLaneId);
    console.log("card id: ", cardId);

    // Find the card data
    let originalLaneInd = getLaneIndex(fromLaneId);

    // Find the index of the target lane
    let finalLaneInd = getLaneIndex(toLaneId);

    let arr = data.lanes[originalLaneInd];
    let cardData = {}

    console.log("Began looking for cards in ", fromLaneId);
    console.log(data);
    for (let c in arr.cards) {
      console.log(c);
      if (arr.cards[c].id === cardId) {
        cardData = arr.cards[c];
        break;
      }
    }

    console.log("The found card is: ", cardData);
    
    try {
      // Publish to front end
      // To add a card
      eventBus.publish({
        type: "ADD_CARD", 
        laneId: toLaneId, 
        card: cardData
      })
      
      // Add to JSON
      data.lanes[finalLaneInd].cards.push(cardData);

      // To remove a card
      eventBus.publish({type: "REMOVE_CARD", laneId: fromLaneId, cardId: cardId})

      // Delete from JSON
      const j = data.lanes[originalLaneInd].cards.indexOf(cardData);
      if (j > -1) { // only splice array when item is found
        data.lanes[originalLaneInd].cards.splice(j, 1); // 2nd parameter means remove one item only
      }

      // Save changes
      transferUserAsset("5ntPFGMhxD4llc0ObTwF", fromLaneId, toLaneId, cardId, cardData);
      console.log("Save finished!");

    } catch (error) {
      console.log(error);
    }
    
  }

  const onCardAdd = (card, laneId) => {
    
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
