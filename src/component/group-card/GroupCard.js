import React from "react";
import "./styles.css";
import wifi from "../../assests/images/wifi.svg";

function GroupCard({
  cardIcon = wifi,
  cardTitle = "Proxy Group 1",
  cardSubtitle = "3 proxies",
  activeClass = "",
  ...props
}) {
  return (
    <div {...props} className={`group-card ${activeClass}`}>
      <div className="group-card-icon">
        <img src={cardIcon} alt="" />
      </div>
      <div className="group-card-content">
        <h5>{cardTitle}</h5>
        <p>{cardSubtitle}</p>
      </div>
    </div>
  );
}

export default GroupCard;
