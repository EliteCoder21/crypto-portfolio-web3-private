import Navbar from "../components/navbar.js";
import { useAuthContext } from '../firebase/context';
import Login from "../components/login.js";
import Board from 'react-trello';
import React, { useEffect, useState } from 'react';

export default function Assets() {
  const { user } = useAuthContext();
  const [eventBus, setEventBus] = useState(undefined);
  var data = require('./kanbanData.json')

  // Find JSON data
  function findByID(ID, section) {

    for (let i = 0; i < section.length; i++) {
      if (section[i].id === ID) {
        return section[i];
      }
    }
    return null;
  }  

  function transferAssetJSON(cardID, originalPlace, finalPlace) {

    let ind = -1;

    console.log('original place: ', originalPlace);
    console.log('final place: ', finalPlace);

    // Find the Index of the card
    for (let i = 0; i < originalPlace.length; i++) {
      console.log('card id ', originalPlace[i].id);
      if (originalPlace[i].id === cardID) {
        ind = i;
        break;
      }
    }

    if (ind == -1) {
      console.error("Card not found!");
      return;
    }

    let card = originalPlace[ind];
    console.log('Found card: ', originalPlace[ind]);
    console.log('--------');

    // Remove the card in original place
    console.log('Before Deletion');
    console.log(originalPlace);
    originalPlace.splice(ind, 1);
    console.log('After deletion');
    console.log(originalPlace);

    // Concatenate the card in new place
    console.log('Before Adding');
    console.log(finalPlace);
    finalPlace.push(card);
    console.log('After Adding');
    console.log(finalPlace);
  }

  // Define the Board functions
  const handleCardDragEnd = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    
    console.log("start: ", sourceLaneId);
    console.log("end: ", targetLaneId);

    // Do the transfer
    transferAssetJSON(cardId, findByID(sourceLaneId, data['lanes'])['cards'], findByID(targetLaneId, data['lanes'])['cards']);

    // Save data to file
    //FileSystem.writeFile('kanbanData.json', JSON.stringify(data), (error) => {
    //  if (error) throw error;
    //});

    console.log(JSON.stringify(data));
  }

  const onCardAddHandler = (card, laneId) => {
    eventBus.publish({
      type: 'UPDATE_CARD', //use this type instead of ADD_CARD
      laneId: laneId,
      card: {
        id: card.id,
        title: card.title,
        label: card.label,
        description: card.description
      }
    });
  }

  const AssetInventory = () => {
    return (
      <div className='bond-data'>
        <div className="myAssets">
          <Board 
            style={{backgroundColor: 'rgba(31, 42, 71, 0)'}}
            data={data}
            handleDragEnd={handleCardDragEnd}
            onCardAdd={onCardAddHandler}
            eventBusHandle={setEventBus}
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
