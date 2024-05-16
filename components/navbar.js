"use client";

import { SettingsIcon } from "@mui/icons-material/Settings";
import { LogoutIcon } from "@mui/icons-material/Logout";
import Image from "next/image";
import { useAuthContext } from '../firebase/context';
import BottomNav from "./bottom-nav.js";

export default function Navbar({ active }) {
  const { handleSignOut } = useAuthContext();
  
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
              href="https://openexa.io"
              target="_blank"
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
              href="https://openexa.to"
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
          <button id="logout-button-new" onClick={handleSignOut}>
            <span className="material-icons md-20"><LogoutIcon /></span>
          </button>
        </div>
        <div />
      </div>
      <BottomNav active={active} />
    </div>
  );
}
