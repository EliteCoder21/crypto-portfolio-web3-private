import Navbar from "../components/navbar.js";
import { useAuthContext } from '../firebase/context';
import Login from "../components/login.js";
import Board from 'react-trello';

export default function Assets() {
  const { user } = useAuthContext();
  const data = require('./kanbanData.json')

  const AssetInventory = () => {
    return (
      <div className='bond-data'>
        <div className="myAssets">
          <Board style={{backgroundColor: 'rgba(31, 42, 71, 0)'}} data={data} />
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
