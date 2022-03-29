import React from "react";
import play from "../../../assests/images/play.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import stop from "../../../assests/images/stop.svg";

function TableRow({ onDelete, obj, index, onPlay }) {
  return (
    <div className="acc-chnager-page-table-header body">
      <div>{index}</div>
      <div>{obj.claimerGroup.label}</div>
      <div style={{ color: getColor(obj.status) }}>{obj.status}</div>
      <div>
        <div className="acc-changer-table-row-action-column">
          <img
            src={obj.status === "Running" ? stop : play}
            alt=""
            onClick={() => onPlay(obj)}
          />
          <UseAnimations
            wrapperStyle={{ cursor: "pointer" }}
            animation={trash2}
            strokeColor="#B60E0E"
            size={25}
            onClick={() => onDelete(obj)}
          />
        </div>
      </div>
    </div>
  );
}

export default TableRow;

const getColor = (status) => {
  switch (status) {
    case "Running":
      return "var(--status)";
    case "Completed":
      return "#1186db";
    case "Stopped":
      return "var(--delete)";
    default:
      return "var(--primary)";
  }
};
