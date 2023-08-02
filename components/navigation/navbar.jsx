
'use client'

import { ConnectKitButton } from "connectkit";
import styles from "../../styles/navbar.module.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TokenIcon from '@mui/icons-material/Token';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import StoreIcon from '@mui/icons-material/Store';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div id={styles.navigation}>
      <div className={styles.headerbar}>
        <div className={styles.menu_logo}>
          <div className={styles.newnew}>
            <Image className={styles.headBarLogo} width={50} height={50} src="/openexamainlogo.png" />
          </div>
        </div>
        <div className={styles.flex}>
          <div className={[styles.relative, styles.group]}>
            <a className={styles.launchAppLink} href="https://openexa.to" target="_blank">
              <button className={[styles.transition, styles.shadowMd]} style={{borderRadius: 500}}>
                <div>Credit Swap</div>
              </button>
            </a>
          </div>
          <div className={[styles.relative, styles.group]}>
            <a className={styles.launchAppLink} href="https://openexa.io" target="_blank">
              <button className={[styles.transition, styles.shadowMd]} style={{borderRadius: 500}}>
                <div>Manage Tokens</div>
              </button>
            </a>
          </div>
        </div>
        <div style={{display: "flex", justifyContent: "end"}}>
          <a href="settings.html" style={{marginRight: 15}}><span className={[styles.materialIcons, styles.md20]}><SettingsIcon /></span></a
          >
          <button id="logout-button-new">
            <span className={[styles.materialIcons, styles.md20]}> logout </span>
          </button>
        </div>
        <div></div>
      </div>
      <div className={styles.headNav}>
        <nav className={[styles.navbar, styles.navbarExpand, styles.navbarLight]}>
          <div className={styles.container}>
            <div className={[styles.navbarCollapse, styles.collapse]} id="navbar-nav">
              <div className={styles.navbarNav} id="toolbar">
                <a className="" href="index.html" style={{marginLeft: 5}}
                  ><li className={styles.texticon}>
                    <button type="button" className={styles.buttonclass}>
                      <div className={styles.icon}>
                        <span className={[styles.materialIcons, styles.md20]}><DashboardIcon /></span>
                      </div>
                      <div className={styles.text}>
                        <span className={styles.text1}>Dashboard</span>
                        <span className={styles.text2}></span>
                      </div>
                    </button></li></a>
                <a className="" href="assets.html" style={{marginLeft: 5}}>
                  <li className={styles.texticon}>
                    <button type="button" className={styles.buttonclass}>
                      <div className={styles.icon}>
                        <span className={[styles.materialIcons, styles.md20]}><AccountBalanceWalletIcon /></span>
                      </div>
                      <div className={styles.text}>
                        <span className={styles.text1}>Assets</span>
                        <span className={styles.text2}></span>
                      </div>
                    </button>
                  </li>
                </a><a className="" href="aut.html" style={{marginLeft: 5}}
                  ><li className={styles.texticon}>
                    <button type="button" className={styles.buttonclass}>
                      <div className={styles.icon}>
                        <span className={[styles.materialIcons, styles.md20]}
                          ><MonetizationOnIcon /></span>
                      </div>
                      <div className={styles.text}>
                        <span className={styles.text1}>AUT</span>
                        <span className={styles.text2}></span>
                      </div>
                    </button></li></a>
                <a className="" href="oxa.html" style={{marginLeft: 5}}
                  ><li className={styles.texticon}>
                    <button type="button" className={styles.buttonclass}>
                      <div className={styles.icon}>
                        <span className={[styles.materialIcons, styles.md20]}><TokenIcon /></span>
                      </div>
                      <div className={styles.text}>
                        <span className={styles.text1}>OXA</span>
                        <span className={styles.text2}></span>
                      </div>
                    </button></li>
                    </a><a className={styles.active} href="holdings.html" style={{marginLeft: 5}}>
                    <li className={styles.texticon}>
                    <button type="button" className={styles.buttonclass}>
                      <div className={styles.icon}>
                        <span className={[styles.materialIcons, styles.md20]}><DataThresholdingIcon /></span>
                      </div>
                      <div className={styles.text}>
                        <span className={styles.text1}>Digital Holdings</span>
                        <span className={styles.text2}></span>
                      </div>
                    </button></li></a>
                <a className="" href="market.html" style={{marginLeft: 5}}
                  ><li className={styles.texticon}>
                    <button type="button" className={styles.buttonclass}>
                      <div className={styles.icon}>
                        <span className={[styles.materialIcons, styles.md20]}><StoreIcon /></span>
                      </div>
                      <div className={styles.text}>
                        <span className={styles.text1}>Market</span>
                        <span className={styles.text2}></span>
                      </div>
                    </button></li></a>
                <a className="" href="activity.html" style={{marginLeft: 5}}
                  ><li className={styles.texticon}>
                    <button type="button" className={styles.buttonclass}>
                      <div className={styles.icon}>
                        <span className={[styles.materialIcons, styles.md20]}><SwapHorizIcon /></span>
                      </div>
                      <div className={styles.text}>
                        <span className={styles.text1}>Activity</span>
                        <span className={styles.text2}></span>
                      </div>
                    </button></li>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
