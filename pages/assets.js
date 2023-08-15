import Navbar from "../components/navbar.js";
import { useAuthContext } from '../firebase/context';
import Login from "../components/login.js";

export default function Assets() {
  const { user } = useAuthContext();

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
              RWA - Real World Assets in Custody
            </h1>
            <div>
              <div className="aut-section">
                <p className="aut-title">AAA / AA Bonds</p>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>CUSIP</th>
                      <th>Amount</th>
                      <th>Interest</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bond A</td>
                      <td>912797GS0</td>
                      <td>100</td>
                      <td>5.2</td>
                      <td>2530</td>
                      <td>Frozen</td>
                    </tr>
                    <tr>
                      <td>Bond B</td>
                      <td>912796Y37</td>
                      <td>100</td>
                      <td>2.8</td>
                      <td>2530</td>
                      <td>Frozen</td>
                    </tr>
                    <tr>
                      <td>Bond C</td>
                      <td>912796Y37</td>
                      <td>100</td>
                      <td>2.8</td>
                      <td>2530</td>
                      <td>Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="aut-section">
                <p className="aut-title">S&amp;P 500 Stocks</p>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Ticker</th>
                      <th>Amount</th>
                      <th>Interest</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>200 MSFT</td>
                      <td>912797GS0</td>
                      <td>100</td>
                      <td>5.2</td>
                      <td>2530</td>
                    </tr>
                    <tr>
                      <td>1000 TL SL</td>
                      <td>912796Y37</td>
                      <td>100</td>
                      <td>2.8</td>
                      <td>2530</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="aut-section">
                <p className="aut-title">Cash</p>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>CUSIP</th>
                      <th>Amount</th>
                      <th>Interest</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>10,000 USD</td>
                      <td>912797GS0</td>
                      <td>100</td>
                      <td>5.2</td>
                      <td>2530</td>
                    </tr>
                  </tbody>
                </table>
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
