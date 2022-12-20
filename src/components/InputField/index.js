import React from "react";
import { withTranslation } from "react-i18next";

import "./styles.scss";

const InputField = ({ title, type, width = "100%", onChange }) => {
  return (
    <input
      onChange={onChange}
      className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="grid-last-name"
      style={{ width: width }}
      type={type}
      placeholder={title}
    />
  );
};

export default withTranslation()(InputField);
