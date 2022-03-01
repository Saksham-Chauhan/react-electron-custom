import React from "react";
import "./styles.css";
import wifi from "../../assests/images/wifi.svg";
import edit from "../../assests/images/edit.svg";
import trash from "../../assests/images/trash.svg";

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
        {isCustomAction && (
          <div className="action-col-icon">
            <img onClick={actionColumn.onEdit} src={edit} alt="" />
            <img onClick={actionColumn.onDelete} src={trash} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupCard;
