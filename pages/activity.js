import Navbar from "../components/navbar.js";
import { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
import firebase_app from "../firebase/config";
import Login from "../components/login.js";
import { useAuthContext } from '../firebase/context';

const db = getFirestore(firebase_app);

const TABLE_STATE = [];

export default function Activity() {
  // console.log("Say something!")
  
  const [activityData, setActivityData] = useState(TABLE_STATE);
  const { user } = useAuthContext();
  

  async function getActivityData() {
    try {

      const dataCollection = collection(doc(collection(db, 'user-activity'), user.uid), 'activity-data');

      const docsSnap = await getDocs(dataCollection);

      docsSnap.forEach(doc => {
        // Get the data
        const data = doc.data();

        // Append the data
        TABLE_STATE.push(
          {date: data.date, coin: data.coin, amount: data.amount, type: data.type, notes: data.notes}
        );

        setActivityData(TABLE_STATE);
    })

    } catch (error) {
        console.log(error);
    }
  }

  const renderTable = () => {

    return (

      <table className="activity-list-wrapper noselect">
        <div className="headers-wrapper" data-list="activity">
          <th className="header date" data-item="date">
            Date
          </th>
          <th className="header symbol" data-item="coin">
            Coin
          </th>
          <th className="header amount" data-item="amount">
            Amount
          </th>
          <th className="header type" data-item="type">
            Type
          </th>
          <th className="header notes" data-item="notes">
            Notes
          </th>
        </div>
        {renderLogs()}        
      </table>
    );
  };

  const renderLogs = () => {
    return activityData.map(({ date, coin, amount, type, notes }) => {
      return (
        <div className="activity-list loading" id="activity-list">
          <div className="event-wrapper loading">
            <tr>
              <td className="header date" data-item="date">
                {date}
              </td>
              <td className="header symbol" data-item="coin">
                {coin}
              </td>
              <td className="header amount" data-item="amount">
                {amount}
              </td>
              <td className="header type" data-item="type">
                {type}
              </td>
              <td className="header notes" data-item="notes">
                {notes}
              </td>
            </tr>
          </div>
        </div>
      );
    });
  };

  getActivityData();

  return (
    <div>
      { user ?
        <div>
          <Navbar active="/activity" />
          <div className="page activity active" id="page-activity">
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
              Activity
            </h1>
            <div
              className="activity-card-wrapper noselect"
              style={{ marginBottom: 20 }}
            >
              <div className="activity-add-card" id="activity-add-card">
                <span className="title">Record Event</span>
                <svg
                  width={1792}
                  height={1792}
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z" />
                </svg>
              </div>
              <div className="activity-search-wrapper">
                <input
                  type="text"
                  id="activity-search-input"
                  placeholder="Query..."
                />
                <button id="activity-search-button">Search</button>
              </div>
            </div>

            {renderTable()}
          </div>
        </div>
        : 
        <Login />
      }
    </div>
  );
}