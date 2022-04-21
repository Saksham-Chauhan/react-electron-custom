import React from "react";
import "./styles.css";
import { AppSpacer } from "..";
import wifi from "../../assests/images/wifi.svg";
import success from "../../assests/images/success.svg";
import decline from "../../assests/images/decline.svg";
import inProcess from "../../assests/images/inProcess.svg";

function GroupCard({
  cardIcon = wifi,
  cardTitle = "",
  cardSubtitle = "",
  activeClass = "",
  hideSubText = false,
  isCustomAction = false,
  actionColumn,
  totalDecline = 0,
  totalSuccess = 0,
  totalInProgress = 0,
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
          <div className="stausIcons">
            <img src={inProcess} alt="" />
            <span>{totalInProgress}</span>
          </div>
          <div className="stausIcons">
            <img src={success} alt="" />
            <span>{totalSuccess}</span>
          </div>
          <div className="stausIcons">
            <img src={decline} alt="" />
            <span>{totalDecline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
