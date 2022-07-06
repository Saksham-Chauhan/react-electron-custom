import React from "react";
import UseAnimations from "react-useanimations";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import stop from "../../../assests/images/stop.svg";
import download from "../../../assests/images/download.svg";
import lightMode_play from "../../../assests/images/lightMode_play.svg";
import { DISCORD_MASS_OPTIONS } from "../../../constant";
import { useSelector } from "react-redux";
import { fetchThemsState } from "../../../features/counterSlice";

// const type = ["linkOpner", "inviteJoiner", "passwordChanger", "tokenRetrieve"];

function TableRow({ onDelete, obj, index, onPlay, onStop, onDownload }) {
  const appTheme = useSelector(fetchThemsState);
  const theme = {
    tableBody: appTheme
      ? "acc-chnager-page-table-header body  light-bg light-mode-table-color"
      : "acc-chnager-page-table-header body",
  };

  const getFlag = (type, status) => {
    if (type === "passwordChanger" || type === "tokenRetrieve") {
      if (status.charAt(0) !== "0") {
        return true;
      } else return false;
    } else return false;
  };
  return (
    <div className={theme.tableBody}>
      <div>{index}</div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "70%", overflow: "hidden" }}>
          {obj.changerType === "linkOpener"
            ? obj?.monitorToken?.label
            : obj?.claimerGroup?.label}
        </div>
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
          {obj["active"] ? (
            <img
              src={stop}
              alt=""
              onClick={() => {
                onStop(obj);
              }}
            />
          ) : (obj.status === "Success" ||
              obj.status.includes("Changed") ||
              obj.status.includes("Retrieved")) &&
            getFlag(obj.changerType, obj.status) ? (
            <img src={download} alt="dwd" onClick={() => onDownload(obj)} />
          ) : (
            <img
              src={appTheme ? lightMode_play : play}
              alt=""
              onClick={() => {
                onPlay(obj);
              }}
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

const getColor = (status, appTheme) => {
  if (status.includes("/")) {
    return appTheme ? "var(--lightMode-complete)" : "#1186db";
  } else {
    switch (status) {
      case "Running":
        return appTheme ? "var(--lightMode-status)" : "var(--status)";
      case "Monitoring...":
        return appTheme ? "var( --lightMode-monitoring)" : "var(--status)";
      case "Monitoring":
        return appTheme ? "var( --lightMode-monitoring)" : "var(--status)";
      case "Completed":
        return appTheme ? "var(--lightMode-complete)" : "#1186db";
      case "Success":
        return appTheme ? "var(--lightMode-complete)" : "#1186db";
      case "Stopped":
        return "var(--delete)";
      case "Error":
        return "var(--delete)";
      case "Idle":
        return appTheme ? "var(--lightMode-text-color)" : "";
      default:
        return "var(--primary)";
    }
  }
};
