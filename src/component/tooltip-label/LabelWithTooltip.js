import React from "react";
import "./styles.css";
import ReactTooltip from "react-tooltip";
import help from "../../assests/images/help.svg";
function LabelWithTooltip({ toolTopText = "I'm Tooltip", labelText }) {
  return (
    <div className="label-with-tooltip">
      <label>{labelText}</label>
      <img data-tip data-for={labelText} src={help} alt="help-icon" />
      <ReactTooltip
        className="custom-tooltip"
        id={labelText}
        place="top"
        backgroundColor="var(--sidebar-bg)"
        type="light"
        effect="solid"
      >
        <p id="custom-tooltip-text">{toolTopText}</p>
      </ReactTooltip>
    </div>
  );
}

export default LabelWithTooltip;
