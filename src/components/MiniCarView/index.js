import React from "react";
import { withTranslation } from "react-i18next";

import "./styles.scss";

const MiniCarView = ({ title, icon }) => {
  return (
    <div
      className="d-flex p-2 rounded justify-content-between align-items-center shadow"
      style={{ backgroundColor: "white", width: "500px" }}
    >
      <p className="font-bold ml-2">{title}</p>
      <img
        src={require(`../../assets/${icon}.webp`)}
        className="mr-2"
        style={{ height: "70px" }}
      />
    </div>
  );
};

export default withTranslation()(MiniCarView);
