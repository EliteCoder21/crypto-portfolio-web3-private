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
  const data = require('./kanbanTestData.json')
  let eventBus = null;
  const setEventBus = (handle) => {
    eventBus = handle;
  }

  async function getAssetsData() {
    try {
      const userDataRef = await getUserAssets("5ntPFGMhxD4llc0ObTwF"); //Replace with user.uid
      let oxaData = getDocs(collection(userDataRef, 'OXA'));
      let digitalData = getDocs(collection(userDataRef, 'Digital Assets'));
      let autData = getDocs(collection(userDataRef, 'AUT'));
      let rwaData = getDocs(collection(userDataRef, 'RWA'));
      
      // Flush each of the data files
      data.lanes[0].cards = [];
      data.lanes[1].cards = [];
      data.lanes[2].cards = [];
      data.lanes[3].cards = [];

      console.log(rwaData);

      // Push the data
      rwaData.forEach((doc) => {
        // Get the data
        const data = doc.data();

        // Append the data
        data.lanes[0].cards.push({
          id: data.id,
          laneId: data.laneId,
          title: data.title,
          label: data.label,
          cardStyle: { "width": 380, "maxWidth": 380, "margin": "auto", "marginBottom": 5 },
          description: data.description
        });
      });

    } catch (error) {
      console.log(error);
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

    // Firebase method 
    getAssetsData("5ntPFGMhxD4llc0ObTwF"); //Replace with user.uid

    
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
