import React from "react";
import "./styles.css";

function GroupStatus({ title = "", subText = "", isHide = false }) {
  return (
    <div className="group-status">
      <h1>{title}</h1>
      {!isHide && (
        <div className="group-status-stats">
          <span />
          <span>{subText}</span>
        </div>
      )}
    </div>
  );
}

export default GroupStatus;
