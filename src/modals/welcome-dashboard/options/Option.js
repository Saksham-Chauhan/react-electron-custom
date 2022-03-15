import React from "react";

import rightAero from "../../../assests/images/rightAero.svg";
import "./style.css";

const Option = ({ logo, text, ...props }) => {
  return (
    <div {...props} className="options">
      <img src={logo} alt="logo" />
      <p>{text}</p>
      <img src={rightAero} alt="aero" />
    </div>
  );
};

export default Option;
