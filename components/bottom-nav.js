import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import StoreIcon from '@mui/icons-material/Store';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import React, { useEffect, useState, useLayoutEffect } from "react";
import { Nav, Container, Navbar, NavDropdown } from "react-bootstrap";

function BottomNav({ active }) {
  const icon_data = [
    { id: 0, href: "/", icon: <DashboardIcon />, text: "Dashboard" },
    { id: 1, href: "/assets", icon: <AccountBalanceWalletIcon />, text: "Assets" },
    { id: 2, href: "/holdings", icon: <DataThresholdingIcon />, text: "Holdings" },
    { id: 3, href: "/market", icon: <StoreIcon />, text: "Market" },
    { id: 4, href: "/activity", icon: <SwapHorizIcon />, text: "Activity" },
  ];

  const icon_width = 115;

  const initial_visible_icons = [];
  const initial_hidden_icons = [];

  for (var i = 0; i < icon_data.length; i++) {
    initial_visible_icons[i] = icon_data[i];
  }

  //const icon_widths = useRef([])
  //icon_widths.current = icon_data.map((element, i) => icon_widths.current[i] ?? createRef());

  /*useEffect(() => {
    for (var i = 0; i < icon_data.length; i++) {
      icon_data.width = icon_widths.current[i].offsetWidth 
    }
  })*/

  const [dimensions, setDimensions] = useState(window.innerWidth);
  const [vis_icons, setVisibleIcons] = useState(
    calcVisIcons(initial_visible_icons)
  );
  const [hid_icons, setHiddenIcons] = useState(
    calcHiddenIcons(vis_icons, initial_hidden_icons)
  );

  function debounceResize() {
    setDimensions(window.innerWidth);
    setVisibleIcons(calcVisIcons(vis_icons));
    setHiddenIcons(calcHiddenIcons(vis_icons, hid_icons));
    if (Math.abs(window.innerWidth - dimensions) > 200) {
      window.location.reload();
    }
  }

  useEffect(() => {
    window.addEventListener("resize", debounceResize);
    return (_) => {
      window.removeEventListener("resize", debounceResize);
    };
  }, [window.innerWidth]);

  function calcVisIcons(v_icons) {
    const icons = v_icons;
    var maxVisibleIcons =
      Math.floor(dimensions / icon_width - 1) >= 0
        ? Math.floor(dimensions / icon_width - 1)
        : 0;
    // console.log("maxVisibleIcons: " + maxVisibleIcons);
    if (maxVisibleIcons < icons.length) {
      while (icons.length > maxVisibleIcons) {
        icons.splice(icons.length - 1, 1);
      }
    } else if (
      maxVisibleIcons > icons.length &&
      icons.length < icon_data.length
    ) {
      if (maxVisibleIcons < icon_data.length) {
        for (var i = icons.length; i <= maxVisibleIcons; i++) {
          icons.push(icon_data[i]);
        }
      } else if (maxVisibleIcons >= icon_data.length) {
        for (var i = icons.length; i < icon_data.length; i++) {
          icons.push(icon_data[i]);
        }
      }
    }

    return icons;
  }

  function calcHiddenIcons(v_icons, hidden_icons) {
    const h_icons = hidden_icons;

    if (v_icons.length + h_icons.length < icon_data.length) {
      if (h_icons.length == 0 && v_icons.length < icon_data.length) {
        if (v_icons.length != 0) {
          const last_v = v_icons[v_icons.length - 1].id;
          for (var i = last_v; i < icon_data.length - 1; i++) {
            h_icons.splice(i - last_v, 0, icon_data[i + 1]);
          }
        }
      } else if (h_icons.length > 0) {
        if (v_icons.length != 0) {
          const last_v = v_icons[v_icons.length - 1].id;
          const first_h = h_icons[0].id;

          for (var i = last_v; i < first_h - 1; i++) {
            h_icons.splice(i - last_v, 0, icon_data[i + 1]);
          }
        } else if (v_icons.length == 0) {
          h_icons.splice(0, 0, icon_data[0]);
        }
      }
    } else if (v_icons.length + h_icons.length > icon_data.length) {
      for (var i = 0; i < h_icons.length; i++) {
        if (h_icons[i].id < v_icons.length) {
          h_icons.splice(i, 1);
        }
      }
    }

    return h_icons;
  }

  return (
    <Navbar style={{ height: 50 }}>
      <Container>
        <div style={{ display: "none" }}>
          <Navbar.Toggle aria-controls="navbar-nav" />
        </div>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="navbar-nav me-auto" id="toolbar">
            {vis_icons.map((data) => (
              <a
                key={data.id}
                exact
                href={data.href}
                style={{ marginLeft: 5 }}
                className={data.href == active ? "active" : ""}
              >
                <li className="texticon">
                  <button type="button" className="buttonclass">
                    <div className="icon">
                      <span className="material-icons md-20">{data.icon}</span>
                    </div>
                    <div className="text">
                      <span className="text1">{data.text}</span>
                      <span className="text2"></span>
                    </div>
                  </button>
                </li>
              </a>
            ))}
            {hid_icons.length > 0 && (
              <NavDropdown
                title="More"
                id="toolbar-dropdown"
                className="texticon dropdonw-menu-right"
                style={{ marginLeft: 5 }}
              >
                <div id="more-menu">
                  {hid_icons.map((data) => (
                    <a
                      className={data.href == active ? "active" : ""}
                      key={data.id}
                      exact
                      href={data.href}
                    >
                      <li className="texticon">
                        <div className="icon">
                          <span className="material-icons md-20">
                            {data.icon}
                          </span>
                        </div>
                        <div className="text">
                          <span className="text1">{data.text}</span>
                          <span className="text2"></span>
                        </div>
                      </li>
                    </a>
                  ))}
                </div>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BottomNav;
