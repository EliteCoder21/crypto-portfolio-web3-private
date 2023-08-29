import Navbar from "../components/navbar.js";
import { useAuthContext } from '../firebase/context';
import Login from "../components/login.js";
import AsyncBoard from 'react-trello';
import React, { useEffect, useState } from 'react';

export default function Assets() {

  // Essential Variables
  const { user } = useAuthContext();
  var data = require('./kanbanData.json')
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

  function transferAsset(cardID, originalLaneId, finalLaneId) {

    console.log('Original index of card is ', findIndexById(finalLaneId, data.lanes))

    //To move a card from one lane to another. index specifies the position to move the card to in the target lane
    eventBus.publish({
      type: 'MOVE_CARD',
      fromLaneId: originalLaneId,
      toLaneId: finalLaneId,
      cardId: cardID,
      index: 0
    });

    // Update laneId
    //let ind = findIndexById(cardID, data.lanes[findIndexById(finalLaneId, data.lanes)]); 
    //data[finalLaneId].cards[cardID].laneId = finalLaneId;

    //To update the lanes
    //eventBus.publish({
    //  type: 'UPDATE_LANES',
    //  lanes: newLaneData
    //});
  }

  // Define the Board functions
  const handleCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
    
    console.log("start: ", fromLaneId);
    console.log("end: ", toLaneId);

    // Do the transfer
    transferAsset(cardId, fromLaneId, toLaneId);

    // Save data to file
    //FileSystem.writeFile('kanbanData.json', JSON.stringify(data), (error) => {
    //  if (error) throw error;
    //});

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
            style={{backgroundColor: 'rgba(31, 42, 71, 0)'}}
            data={data}
            draggable
            eventBusHandle={setEventBus}
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
