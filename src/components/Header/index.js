import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import routeNames from "../../routes/routeNames";
import Button from "../Button";
// import logo from "../../assets/logo.svg";

import "./styles.scss";

const Header = ({ t }) => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userData")
  );

  const logout = () => {
    localStorage.setItem("userToken", "");
    localStorage.setItem("userType", "");
    localStorage.clear();
    window.location.reload();
    Navigate("/");
  };
console.log("isLoggedIn", isLoggedIn, localStorage.getItem("userData"))
  return (
    <div className="header">
      <div>
        <nav
          className="navbar navbar-2 navbar-expand-md d-flex"
          style={{ height: show ? "300px" : "70px" }}
        >
          <a className="navbar-brand" href="/">
            GMDC
            {/* <img src={logo} width="88px" height="80px" alt="logo" /> */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div style={{ display: show ? "block" : "none" }} className="mob">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.landing}>
                  Home
                </a>
              </li>
              {isLoggedIn &&
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
            {!localStorage.getItem("userData") ? (
              <div className="d-flex flex-column gap-2">
                <a href={routeNames.general.login}>
                  <Button title={"Signin"} primary={true} />
                </a>
                <a href={routeNames.general.signup}>
                  <Button title={"Signup"} primary={true} />
                </a>
              </div>
            ) : (
              <Button title={"Logout"} primary={true} onClick={logout} />
            )}
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <a className="nav-link" href={routeNames.general.landing}>
                  Home
                </a>
              </li>
              {isLoggedIn &&
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

          {!isLoggedIn ? (
            <div className="d-flex gap-3 buttonss">
              <a href={routeNames.general.login}>
                <Button title={"Signin"} primary={true} />
              </a>
              <a href={routeNames.general.signup}>
                <Button title={"Signup"} primary={true} />
              </a>
            </div>
          ) : (
            <div className="buttonss">
              <Button title={"Logout"} primary={true} onClick={logout} />
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default withTranslation()(Header);
