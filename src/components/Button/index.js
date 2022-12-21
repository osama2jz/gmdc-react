import React from "react";
import { withTranslation } from "react-i18next";

import "./styles.scss";

const Button = ({
  title,
  primary = false,
  width,
  fontSize,
  onClick,
  fontWeight = "nromal",
}) => {
  return (
    <button
      className="btn float-right but"
      onClick={onClick}
      style={{
        backgroundColor: primary ? "rgb(0, 97, 158)" : "white",
        border: "1px solid rgb(0,0,0,0.3)",
        color: primary ? "white" : "black",
        width: width,
        fontSize: fontSize,
        fontWeight: fontWeight,
      }}
    >
      {title}
    </button>
  );
};

export default withTranslation()(Button);
