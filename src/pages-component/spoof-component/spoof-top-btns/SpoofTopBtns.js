import React from "react";
import {
  stopSpoofer,
  startSpoofer,
  deleteSpoofer,
  launchSpoofer,
} from "../../../helper/electron-bridge";
import { useDispatch, useSelector } from "react-redux";
import { toastWarning } from "../../../toaster";
import play from "../../../assests/images/play.svg";
import plus from "../../../assests/images/plus.svg";
import stop from "../../../assests/images/stop.svg";
import searchIcon from "../../../assests/images/search.svg";
import lightModesearch from "../../../assests/images/lightModesearch.svg";
import lightModeplush from "../../../assests/images/lightModeplus.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import {
  appendSpooferInList,
  fetchThemsState,
  setModalState,
} from "../../../features/counterSlice";

function SpoofTopBtns({ tableList, search, handleSearching }) {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setModalState("spoofModal"));
  };
  const appTheme = useSelector(fetchThemsState);

  const handleAll = (key) => {
    if (tableList.length > 0) {
      tableList.forEach((spoof) => {
        if (key === "LAUNCH") {
          launchSpoofer(spoof);
        } else if (key === "START") {
          startSpoofer(spoof);
        } else if (key === "STOP") {
          stopSpoofer(spoof);
        } else {
          deleteSpoofer(spoof);
          dispatch(appendSpooferInList([]));
        }
      });
    } else toastWarning("Create some spoof");
  };

  const btnClass = appTheme
    ? "icon-btn-wrapper btn lightBg"
    : "icon-btn-wrapper btn";

  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container spoofer-page">
        <div
          className={
            appTheme
              ? "page-top-search-container lightBg "
              : "page-top-search-container"
          }
        >
          <img
            src={appTheme ? lightModesearch : searchIcon}
            alt="search-icon"
          />
          <input
            value={search}
            onChange={handleSearching}
            placeholder="Search"
            type="search"
            className={appTheme ? "lightModeInput" : ""}
          />
        </div>

        <div onClick={handleOpenModal} className={btnClass}>
          <img src={appTheme ? lightModeplush : plus} alt="" />
        </div>
        <div onClick={() => handleAll("START")} className={btnClass}>
          <img src={play} alt="" />
        </div>
        <div onClick={() => handleAll("STOP")} className={btnClass}>
          <img src={stop} alt="" />
        </div>
        <div onClick={() => handleAll("DELETE")} className={btnClass}>
          <UseAnimations
            animation={trash2}
            strokeColor="#B60E0E"
            size={25}
            wrapperStyle={{ cursor: "pointer", paddingBottom: "2px" }}
          ></UseAnimations>
        </div>
        <div
          onClick={() => handleAll("LAUNCH")}
          className={
            appTheme
              ? "btn-with-no-icon btn remove-btn lightBg"
              : "btn-with-no-icon btn remove-btn"
          }
        >
          <span style={{ color: appTheme ? "#076366" : "" }}>Launch All</span>
        </div>
      </div>
    </div>
  );
}

export default SpoofTopBtns;
