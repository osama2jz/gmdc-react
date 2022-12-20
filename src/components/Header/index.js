import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { useScrollDirection } from "../../hooks";
import routeNames from "../../routes/routeNames";
// import logo from "../../assets/logo.svg";

import "./styles.scss";

const Header = ({ t }) => {
  const scrollDirection = useScrollDirection();
  const [show, setShow] = useState(false);

  return (
    <div className="header">
      <div>
        <nav
          className="navbar navbar-2 navbar-expand-md"
          style={{ height: show ? "300px" : "70px" }}
        >
          <a className="navbar-brand" href="/">
            GMDC
            {/* <img src={logo} width="88px" height="80px" alt="logo" /> */}
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div style={{ display: show ? "block" : "none" }} className="mob">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.landing}>
                  Home
                </a>
              </li>
              {localStorage.getItem("userData") &&
              JSON.parse(localStorage.getItem("userData")).role ===
                "customer" ? (
                <li className="nav-item">
                  <a className="nav-link" href={routeNames.general.dashboard}>
                    Dashboard
                  </a>
                </li>
              ) : null}
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.inventory}>
                  Car Finder
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.apply}>
                  Apply Online
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.aboutUs}>
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.landing}>
                  Home
                </a>
              </li>
              {localStorage.getItem("userData") &&
              JSON.parse(localStorage.getItem("userData")).role ===
                "customer" ? (
                <li className="nav-item">
                  <a className="nav-link" href={routeNames.general.dashboard}>
                    Dashboard
                  </a>
                </li>
              ) : null}
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.inventory}>
                  Car Finder
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.apply}>
                  Apply Online
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.aboutUs}>
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default withTranslation()(Header);
