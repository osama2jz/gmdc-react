import { Select } from "@mantine/core";
import React from "react";
import { withTranslation } from "react-i18next";

import "./styles.scss";

const InputField = ({ title, children = [], onChange }) => {
  return <Select label={title} placeholder={title} data={children} onChange={onChange}/>;
};

export default withTranslation()(InputField);
