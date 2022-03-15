import React from "react";
import "./styles.css";
import wifi from "../../assests/images/wifi.svg";

function GroupCard({
  cardIcon = wifi,
  cardTitle = "Proxy Group 1",
  cardSubtitle = "3 proxies",
  activeClass = "",
  hideSubText = false,
  isCustomAction = false,
  actionColumn,
  ...props
}) {
  return (
    <div {...props} className="group-card">
      <div className={`group-card-inner ${activeClass}`}>
        <div className="group-card-icon">
          <img src={cardIcon} alt="" />
        </div>
        <div className={`group-card-content ${isCustomAction && "clip-text"}`}>
          <h5>{cardTitle}</h5>
          {!hideSubText && <p>{cardSubtitle} proxies</p>}
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
