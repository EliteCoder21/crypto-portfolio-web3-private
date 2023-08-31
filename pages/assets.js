import Navbar from "../components/navbar.js";
import Login from "../components/login.js";
import AsyncBoard from 'react-trello';
import { useAuthContext } from "../firebase/context";
import React, { useEffect, useState } from 'react';
import { addUserActivity, getUserAssets } from "../firebase/user.js";
import { collection, getDocs } from "firebase/firestore";

export default function Assets() {

  // Essential Variables
  const { user } = useAuthContext();

  // Populate kanban data
  const data = require("./kanbanTestData.json");
  getAssetsData("5ntPFGMhxD4llc0ObTwF");

  // Event Bus for operations
  let eventBus = null;
  const setEventBus = (handle) => {
    eventBus = handle;
  }

  // Get Data
  async function getAssetsData() {
    try {
      const userDataRef = await getUserAssets("5ntPFGMhxD4llc0ObTwF"); //Replace with user.uid

      const oxaCollection = collection(userDataRef, 'OXA');
      const oxaSnap = await getDocs(oxaCollection);

      // Push the data
      oxaSnap.forEach((doc) => {
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
          type: 'ADD_CARD', 
          laneId: 'OXA Lane', 
          card: cardData
        })        

        // Add to json file
        data.lanes[2].cards.push(cardData);

        console.log("The final updated data is:")
        console.log(data);
      });

    } catch (error) {
      console.log(error);
      console.log("IT DIDN'T WORK!")
    }
  }

  // Find JSON data
  function findIndexById(ID, section) {

    for (let i = 0; i < section.length; i++) {
      if (section[i].id === ID) {
        return i;
      }
    }
    return -1;
  }

  // Define the Board functions
  const handleCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
    
    console.log("start: ", fromLaneId);
    console.log("end: ", toLaneId);
    console.log('card id: ', cardId);

    // Find the card data
    let laneInd;
    switch(fromLaneId) {
      case "AUT Lane":
        laneInd = 1;
        break;
      case "OXA Lane":
        laneInd = 2;
        break;
      case "Digital Assets Lane":
        laneInd = 3;
        break;
      default:
        laneInd = 0;
        break;
    }

    let arr = data.lanes[laneInd];
    let cardData = {}

    console.log("Began looking for cards");
    console.log(arr.cards);
    for (let c in arr.cards) {
      console.log(c);
      if (arr.cards[c].id === cardId) {
        cardData = arr.cards[c];
        break;
      }
    }

    console.log('The found card is: ', cardData);
    
    try {
      // Publish to front end
      //To add a card
      eventBus.publish({
        type: 'ADD_CARD', 
        laneId: toLaneId, 
        card: cardData
      })

      //To remove a card
      eventBus.publish({type: 'REMOVE_CARD', laneId: fromLaneId, cardId: cardId})

    } catch (error) {
      console.log(error);
    }
    
  }

  const onCardAdd = (card, laneId) => {
    // Define this later
  }


  const AssetInventory = () => {
    return (
      <div className='bond-data'>
        <div className="myAssets">
          <AsyncBoard
            eventBusHandle={setEventBus} 
            style={{backgroundColor: 'rgba(31, 42, 71, 0)'}}
            data={data}
            draggable
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
