import React from "react";
import UseAnimations from "react-useanimations";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import stop from "../../../assests/images/stop.svg";
import download from "../../../assests/images/download.svg";
import { DISCORD_MASS_OPTIONS } from "../../../constant";

function TableRow({ onDelete, obj, index, onPlay, onStop, onDownload }) {
  return (
    <div className="acc-chnager-page-table-header body">
      <div>{index}</div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "70%", overflow: "hidden" }}>
          {obj.changerType === "giveawayJoiner" ||
          obj.changerType === "linkOpener"
            ? obj?.monitorToken?.label
            : obj?.claimerGroup?.label}
        </div>
        {obj.changerType === "giveawayJoiner" && "..."}
      </div>
      <div>
        {
          DISCORD_MASS_OPTIONS.filter(
            (data) => data["value"] === obj?.changerType
          )[0]["label"]
        }
      </div>
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
          (obj?.changerType === "passwordChanger" ||
            obj?.changerType === "tokenRetrieve") ? (
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

const getColor = (status, appTheme) => {
  switch (status) {
    case "Running":
      return appTheme ? "var(--lightMode-status)" : "var(--status)";
    case "Monitoring...":
      return appTheme ? "var( --lightMode-monitoring)" : "var(--status)";
    case "Completed":
      return appTheme ? "var(--lightMode-complete)" : "#1186db";
    case "Stopped":
      return "var(--delete)";
    case "idle":
      return appTheme ? "var(--lightMode-text-color)" : "";
    default:
      return "var(--primary)";
  }
};
