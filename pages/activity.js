import Navbar from "../components/navbar.js";
import { useState, useEffect } from "react";
const { getDatabase } = require('firebase-admin/database');
import { useAuthContext } from '../firebase/context/context';
import Login from "../components/login.js";

const INITIAL_STATE = [
  {date: 'today', coin: 'Dogecoin', amount: 21, type: 'beats me', notes: 'Totally legit crypto'}
];


export default function Activity() {
  const [activityData, setActivityData] = useState(INITIAL_STATE);
  const { user } = useAuthContext();
  getActivityData();

  function getActivityData() {
  
    // Get a database reference to our posts
    const db = getDatabase();
    const ref = db.ref('server/sample_data/activity');
  
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on('value', (snapshot) => {
      console.log(snapshot.val());
      setActivityData(snapshot.val());
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    }); 
  }
  
  const renderLogs = () => {
    return activityData.map(({ date, coin, amount, type, notes }) => {
      return (
        <tr>
          <span className="header date" data-item="date">
            {date}
          </span>
          <span className="header symbol" data-item="coin">
            {coin}
          </span>
          <span className="header amount" data-item="amount">
            {amount}
          </span>
          <span className="header type" data-item="type">
            {type}
          </span>
          <span className="header notes" data-item="notes">
            {notes}
          </span>
        </tr>
      );
    });
  };

  const renderHeader = () => {
    return (
      <div className="activity-list-wrapper noselect">
        <div className="headers-wrapper" data-list="activity">
          <span className="header date" data-item="date">
            Date
          </span>
          <span className="header symbol" data-item="coin">
            Coin
          </span>
          <span className="header amount" data-item="amount">
            Amount
          </span>
          <span className="header type" data-item="type">
            Type
          </span>
          <span className="header notes" data-item="notes">
            Notes
          </span>
        </div>
      </div>
    );
  };

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

            {renderHeader()}

            <div className="activity-list loading" id="activity-list">
              <div className="event-wrapper loading">
                {renderLogs()}
              </div>
            </div>

          </div>
        </div>
        : 
        <Login />
      }
    </div>
  );
}
