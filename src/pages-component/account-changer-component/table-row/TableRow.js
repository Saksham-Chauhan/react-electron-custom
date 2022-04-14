import React from "react";
import UseAnimations from "react-useanimations";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import stop from "../../../assests/images/stop.svg";
import { DISCORD_MASS_OPTIONS } from "../../../constant";
import download from "../../../assests/images/download.svg";

const CONDITIONAL_TOKEN = ["linkOpener"];

function TableRow({ onDelete, obj, index, onPlay, onStop, onDownload }) {
  return (
    <div className="acc-chnager-page-table-header body">
      <div>{index}</div>
      <div>
        {
          DISCORD_MASS_OPTIONS.filter(
            (type) => type["value"] === obj["changerType"]
          )[0]["label"]
        }
      </div>
      <div
        style={{
          textOverflow: "ellipsis",
          overflowX: "hidden",
        }}
      >
        {CONDITIONAL_TOKEN.includes(obj["changerType"])
          ? obj?.monitorToken?.label
          : obj?.claimerGroup?.label}
      </div>
      <div style={{ color: getColor(obj?.status) }}>{obj?.status}</div>
      <div>
        <div className="acc-changer-table-row-action-column">
          {obj?.status === "Completed" &&
          obj["changerType"] === "passwordChanger" ? (
            <img src={download} alt="dwd" onClick={() => onDownload(obj)} />
          ) : obj["active"] ? (
            <img src={stop} alt="" onClick={() => onStop(obj)} />
          ) : (
            <img src={play} alt="" onClick={() => onPlay(obj)} />
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
    case "Monitoring...":
      return "var(--status)";
    case "Completed":
      return "#1186db";
    case "Stopped":
      return "var(--delete)";
    default:
      return "var(--primary)";
  }
};
