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
  disable=false
}) => {
  return (
    <button
      className="btn float-right but"
      disabled={disable}
      onClick={onClick}
      style={{
        backgroundColor: primary ? "rgb(0, 97, 158)" : "white",
        border: "1px solid rgb(0,0,0,0.3)",
        color: primary ? "white" : "black",
        opacity: disable ? 0.2 : 1,
        cursor: disable ? 'not-allowed': 'pointer',
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
