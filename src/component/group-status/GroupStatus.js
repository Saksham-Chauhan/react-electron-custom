import React from "react";
import "./styles.css";

function GroupStatus({
  title = "Proxy Group 1",
  subText = "2 Proxies running",

}) {
  return (
    <div className="group-status">
      <h1>{title}</h1>
      <div className="group-status-stats">
        <span />
        <span>{subText}</span>
      </div>
    </div>
  );
}

export default GroupStatus;
