"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TokenIcon from "@mui/icons-material/Token";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import StoreIcon from "@mui/icons-material/Store";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";

export default function Navbar() {
  return (
    <div id="navigation">
      <div className="headerbar">
        <div className="menu_logo">
          <div className="newnew">
            <Image
              className="headBar-logo"
              width={80}
              height={35}
              src="/openexamainlogo.png"
            />
          </div>
        </div>
        <div className="flex">
          <div className="relative group">
            <a
              className="launchApp-link"
              href="https://openexa.to" //This is where we have to change
              target="_blank" //Or maybe here
            >
              <button
                className="transition shadow-md"
                style={{ borderRadius: 500 }}
              >
                <div>Credit Swap</div>
              </button>
            </a>
          </div>
          <div className="relative group">
            <a
              className="launchApp-link"
              href="https://openexa.io"
              target="_blank"
            >
              <button
                className="transition shadow-md"
                style={{ borderRadius: 500 }}
              >
                <div>Manage Tokens</div>
              </button>
            </a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <a className="" href="/settings" style={{ marginRight: 15, color: "gray" }}>
            <span className="material-icons md-20"><SettingsIcon /></span>
          </a>
          <button id="logout-button-new">
            <span className="material-icons md-20"><LogoutIcon /></span>
          </button>
        </div>
        <div />
      </div>
      <div className="headNav">
        <nav className="navbar navbar-expand navbar-light">
          <div className="container">
            <div className="navbar-collapse collapse" id="navbar-nav">
              <div className="navbar-nav" id="toolbar">
                <a
                  className="active"
                  href="/"
                  style={{ marginLeft: 5 }}
                >
                  <li className="texticon">
                    <button type="button" className="buttonclass">
                      <div className="icon">
                        <span className="material-icons md-20"><DashboardIcon /></span>
                      </div>
                      <div className="text">
                        <span className="text1">Dashboard</span>
                        <span className="text2" />
                      </div>
                    </button>
                  </li>
                </a>
                <a className="" href="/assets" style={{ marginLeft: 5 }}>
                  <li className="texticon">
                    <button type="button" className="buttonclass">
                      <div className="icon">
                        <span className="material-icons md-20">
                          <AccountBalanceWalletIcon />
                        </span>
                      </div>
                      <div className="text">
                        <span className="text1">Assets</span>
                        <span className="text2" />
                      </div>
                    </button>
                  </li>
                </a>
                <a className="" href="/aut" style={{ marginLeft: 5 }}>
                  <li className="texticon">
                    <button type="button" className="buttonclass">
                      <div className="icon">
                        <span className="material-icons md-20">
                          <MonetizationOnIcon />
                        </span>
                      </div>
                      <div className="text">
                        <span className="text1">AUT</span>
                        <span className="text2" />
                      </div>
                    </button>
                  </li>
                </a>
                <a className="" href="/oxa" style={{ marginLeft: 5 }}>
                  <li className="texticon">
                    <button type="button" className="buttonclass">
                      <div className="icon">
                        <span className="material-icons md-20"><TokenIcon /></span>
                      </div>
                      <div className="text">
                        <span className="text1">OXA</span>
                        <span className="text2" />
                      </div>
                    </button>
                  </li>
                </a>
                <a className="" href="/holdings" style={{ marginLeft: 5 }}>
                  <li className="texticon">
                    <button type="button" className="buttonclass">
                      <div className="icon">
                        <span className="material-icons md-20">
                          <DataThresholdingIcon />
                        </span>
                      </div>
                      <div className="text">
                        <span className="text1">Digital Holdings</span>
                        <span className="text2" />
                      </div>
                    </button>
                  </li>
                </a>
                <a className="" href="/market" style={{ marginLeft: 5 }}>
                  <li className="texticon">
                    <button type="button" className="buttonclass">
                      <div className="icon">
                        <span className="material-icons md-20"><StoreIcon /></span>
                      </div>
                      <div className="text">
                        <span className="text1">Market</span>
                        <span className="text2" />
                      </div>
                    </button>
                  </li>
                </a>
                <a className="" href="/activity" style={{ marginLeft: 5 }}>
                  <li className="texticon">
                    <button type="button" className="buttonclass">
                      <div className="icon">
                        <span className="material-icons md-20"><SwapHorizIcon /></span>
                      </div>
                      <div className="text">
                        <span className="text1">Activity</span>
                        <span className="text2" />
                      </div>
                    </button>
                  </li>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
