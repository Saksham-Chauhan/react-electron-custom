import React from "react";
import "./styles.css";
import wifi from "../../assests/images/wifi.svg";
import decline from "../../assests/images/decline.svg";
import inProcess from "../../assests/images/inProcess.svg";
import success from "../../assests/images/success.svg";
import { AppSpacer } from "..";

const StatusIcons = ({ icon }) => (
  <div className="stausIcons">
    <img src={icon} alt="" />
    <span>10</span>
  </div>
);

function GroupCard({
  cardIcon = wifi,
  cardTitle = "",
  cardSubtitle = "",
  activeClass = "",
  hideSubText = false,
  isCustomAction = false,
  actionColumn,
  ...props
}) {
  return (
    <div {...props} className="group-card">
      <div className={`group-card-inner ${activeClass} `}>
        <div className="groupCard_heading">
          <img src={cardIcon} alt="" />
          <h5>{cardTitle}</h5>
        </div>
        <AppSpacer spacer={13} />
        <div className="groupCard_Status">
          <StatusIcons icon={inProcess} />
          <StatusIcons icon={success} />
          <StatusIcons icon={decline} />
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
