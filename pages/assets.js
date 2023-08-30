import Navbar from "../components/navbar.js";
import { useAuthContext } from '../firebase/context';
import Login from "../components/login.js";
import AsyncBoard from 'react-trello';
import React, { useEffect, useState } from 'react';

export default function Assets() {

  async function getActivityData() {
    try {
      const docsSnap = await getUserActivities(user.uid);
      const userData = docsSnap.data();

      docsSnap.forEach((doc) => {
        // Get the data
        const data = doc.data();

        // Append the data
        TABLE_STATE.push({
          date: data.date,
          coin: data.coin,
          amount: data.amount,
          type: data.type,
          notes: data.notes,
        });
      });

      setActivityData(TABLE_STATE);
      setOriginalActivityData(TABLE_STATE);
    } catch (error) {
      console.log(error);
    }
  }

  // Essential Variables
  const { user } = useAuthContext();
  var data = require('./kanbanTestData.json')
  let eventBus = null;
  const setEventBus = (handle) => {
    eventBus = handle;
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

    console.log("Final Result:")
    console.log(JSON.stringify(data));
  }

  const onCardAdd = (card, laneId) => {
    // Define this later
  }


  const AssetInventory = () => {
    return (
      <div className='bond-data'>
        <div className="myAssets">
          <AsyncBoard
            editable
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
