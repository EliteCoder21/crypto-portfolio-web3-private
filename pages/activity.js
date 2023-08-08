import Navbar from "../components/navbar.js";

export default function Activity() {
  async function someFunction() {
      const response = await fetch("/api/activity/import.js");
  
      const movies = await response.json();
  
      console.log(movies);
  }

  return (
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
          <div className="activity-list loading" id="activity-list">
            <div className="event-wrapper loading">
              <span>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
