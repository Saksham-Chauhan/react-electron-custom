import React from "react";
import "./styles.css";
import plus from "../../assests/images/plus.svg";

function GroupTitle({ title = "Proxy Group", ...props }) {
  return (
    <div className="group-title">
      <span>{title}</span>
      <div {...props} className="group-title btn">
        <img src={plus} alt="" />
      </div>
    </div>
  );
}

export default GroupTitle;
