import Navbar from "../components/navbar.js";
import { useAuthContext } from '../firebase/context';
import Login from "../components/login.js";
import Board from 'react-trello';

export default function Assets() {
  const { user } = useAuthContext();
  const data = require('./kanbanData.json')

  // Find JSON data
  function findByID(laneID, records) {

    for (let r in records) {
      if (r['id'] == laneID) {
        return r;
      }
    }

    return {}
  }

  function excludeByID(laneID, records) {

    let ret = [];

    for (let i = 0; i < records.length; i++) {
      if (records[i][id] !== laneID) {
        ret.push(records[i]);
      }
    }

    records = ret;
  }

  function transferAssetJSON(cardID, originalPlace, finalPlace) {
    // Get the card data
    const card = findByID(cardID, originalPlace);

    // Remove the card in original place
    originalPlace = excludeByID(cardID, originalPlace);

    // Concatenate the card in new place
    
    finalPlace = Object.keys(finalPlace);
    finalPlace.concat(card);
  }

  // Define the Board functions
  const handleCardDragEnd = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    console.log('Card drag started:', cardId, sourceLaneId, targetLaneId, position, cardDetails);

    // Do the transfer
    transferAssetJSON(cardId, findByID(sourceLaneId, data['lanes']), findByID(targetLaneId, data['lanes']))

    // Save data to file
    FileSystem.writeFile('kanbanData.json', JSON.stringify(data), (error) => {
      if (error) throw error;
    });

    console.log(JSON.stringify(data));
  }

  const AssetInventory = () => {
    return (
      <div className='bond-data'>
        <div className="myAssets">
          <Board 
            style={{backgroundColor: 'rgba(31, 42, 71, 0)'}}
            data={data}
            handleDragEnd={handleCardDragEnd}
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
