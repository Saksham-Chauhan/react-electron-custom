import React from "react";
import UseAnimations from "react-useanimations";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import stop from "../../../assests/images/stop.svg";
import download from "../../../assests/images/download.svg";

function TableRow({ onDelete, obj, index, onPlay, onDownload }) {
  let type = "";
  return (
    <div className="acc-chnager-page-table-header body">
      <div>{index}</div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "70%", overflow: "hidden" }}>
          {obj.changerType === "giveawayJoiner"
            ? obj?.token
            : obj?.claimerGroup?.label}
        </div>
        {obj.changerType === "giveawayJoiner" && "..."}
      </div>
      <div>{obj.changerType}</div>
      <div
        style={{
          color: getColor(obj?.status),
        }}
      >
        {obj?.status}
      </div>
      <div>
        <div className="acc-changer-table-row-action-column">
          {obj?.status === "Completed" &&
          (type === "passwordChanger" || type === "tokenRetrieve") ? (
            <img src={download} alt="dwd" onClick={() => onDownload(obj)} />
          ) : (
            <img
              src={
                obj?.status === "Running" || obj?.status === "Monitoring"
                  ? stop
                  : play
              }
              alt=""
              onClick={() => onPlay(obj)}
            />
          )}
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
    case "Monitoring":
      return "var(--status)";
    case "Completed":
      return "#1186db";
    case "Stopped":
      return "var(--delete)";
    default:
      return "var(--primary)";
  }
};
