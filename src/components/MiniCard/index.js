import React from "react";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

const MiniCard = ({ title, icon }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/inventory")}
      className="d-flex p-2 rounded-pill justify-content-around align-items-flex-end text-white hoverr"
      style={{
        backgroundColor: "rgb(0, 97, 158)",
        width: "180px",
        border: "1px solid white",
        height: "45px",
      }}
    >
      <img
        src={require(`../../assets/${icon}.webp`)}
        className="mr-2"
        style={{ height: "20px" }}
      />
      <p>{title}</p>
    </div>
  );
};

export default withTranslation()(MiniCard);
