import React from "react";
import "./styles.css";
import ReactTooltip from "react-tooltip";
import help from "../../assests/images/help.svg";
import lightModehelp from "../../assests/images/lightModehelp.svg";
import { fetchThemsState } from "../../features/counterSlice";
import { useSelector } from "react-redux";
function LabelWithTooltip({
  toolTopText,
  labelText,
  isCustomToolTip = false,
  parentStyle,
  children,
  text = true,
  click = false,
  ...props
}) {
  const appTheme = useSelector(fetchThemsState);
  return (
    <div {...parentStyle} className="label-with-tooltip ">
      <label className={appTheme ? "lightMode_color" : ""}>
        {text ? labelText : ""}
      </label>
      <img
        data-tip
        data-for={labelText}
        src={appTheme ? lightModehelp : help}
        alt="help-icon"
        onClick={() => {
          if (click) {
            window.open("https://www.youtube.com/watch?v=YEgFvgg7ZPI");
          }
        }}
      />
      <ReactTooltip
        {...props}
        id={labelText}
        place="top"
        type="light"
        effect="solid"
        className="custom-tooltip"
        backgroundColor="var(--sidebar-bg)"
      >
        {isCustomToolTip ? (
          children
        ) : (
          <p
            id="custom-tooltip-text"
            style={{ cursor: click ? "pointer" : "" }}
          >
            {toolTopText}
          </p>
        )}
      </ReactTooltip>
    </div>
  );
}

export default LabelWithTooltip;
