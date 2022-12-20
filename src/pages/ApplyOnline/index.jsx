import React, { useRef, useState } from "react";
import { withTranslation } from "react-i18next";
import Page from "../../components/Page";
import "./styles.scss";

const ApplyOnline = () => {
  return (
    <Page meta="PISES">
      <div style={{ margin: "auto", width: "400px" }}>
        <h1 className="top">Apply Online here</h1>
        <div
          style={{
            backgroundColor: "rgb(0, 97, 148)",
            width: "70px",
            height: "5px",
            margin: "10px 60px",
          }}
        ></div>
      </div>
      <div
        style={{
          border: "1px solid rgb(0, 0, 0, 0.2)",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "0px auto",
          maxWidth: "800px",
          marginBottom: "20px",
        }}
      >
        <iframe
          src="https://www.carzlane.com/apply-online/"
          style={{
            border: "0px none",
            marginLeft: "-85px",
            height: "1850px",
            marginTop: "-203px",
            width: "926px",
          }}
        ></iframe>
      </div>
    </Page>
  );
};

export default withTranslation()(ApplyOnline);
