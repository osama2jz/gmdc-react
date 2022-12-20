import React, { useRef, useState } from "react";
import { withTranslation } from "react-i18next";
import Page from "../../components/Page";
import "./styles.scss";

const AboutUs = () => {
  return (
    <Page meta="PISES">
      <div className="contact">
        <div style={{ margin: "auto", width: "190px" }}>
          <h2 style={{ textAlign: "center" }}>Visit Us Today!</h2>
          <div
            style={{
              backgroundColor: "rgb(0, 97, 148)",
              width: "50px",
              height: "5px",
              margin: "10px 0px",
            }}
          ></div>
        </div>
        <div className="add1">Hanover Location</div>
        <div className="add">2747 Annapolis Rd, Hanover MD 21076</div>
        <div className="day">
          <p className="p">Monday</p>
          9:00 AM - 8:00 PM
        </div>
        <div className="day">
          <p className="p">Tuesday</p>
          9:00 AM - 8:00 PM
        </div>
        <div className="day">
          <p className="p">Wednesday</p>
          9:00 AM - 8:00 PM
        </div>
        <div className="day">
          <p className="p">Thursday</p>
          9:00 AM - 8:00 PM
        </div>
        <div className="day">
          <p className="p">Firday</p>
          9:00 AM - 8:00 PM
        </div>
        <div className="day">
          <p className="p">Saturuday</p>
          9:00 AM - 8:00 PM
        </div>
        <div className="day">
          <p className="p">Sunday</p>
          Closed
        </div>
      </div>
    </Page>
  );
};

export default withTranslation()(AboutUs);
