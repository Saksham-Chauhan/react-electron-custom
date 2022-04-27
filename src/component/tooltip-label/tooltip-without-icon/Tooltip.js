import React from "react";
import ReactTooltip from "react-tooltip";
import "../styles.css";

const Tooltip = ({ id, text }) => {
  return (
    <ReactTooltip
      id={id}
      place="top"
      effect="solid"
      type="light"
      className="custom-tooltip"
      backgroundColor="var(--sidebar-bg)"
    >
      <p className="custom-tooltip-text">{text}</p>
    </ReactTooltip>
  );
};
export default Tooltip;
