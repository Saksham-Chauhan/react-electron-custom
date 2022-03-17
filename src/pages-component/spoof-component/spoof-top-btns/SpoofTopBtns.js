import React from "react";
import {
  stopSpoofer,
  startSpoofer,
  deleteSpoofer,
  launchSpoofer,
} from "../../../helper/electron-bridge";
import { useDispatch } from "react-redux";
import { toastWarning } from "../../../toaster";
import play from "../../../assests/images/play.svg";
import plus from "../../../assests/images/plus.svg";
import stop from "../../../assests/images/stop.svg";
import searchIcon from "../../../assests/images/search.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import {
  appendSpooferInList,
  setModalState,
} from "../../../features/counterSlice";
import { deleteSpooferFromList } from "../../../features/logic/spoof";

function SpoofTopBtns({ tableList, search, handleSearching }) {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setModalState("spoofModal"));
  };

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

  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container spoofer-page">
        <div className="page-top-search-container">
          <img src={searchIcon} alt="search-icon" />
          <input
            value={search}
            onChange={handleSearching}
            placeholder="Search"
            type="search"
          />
        </div>
        <div onClick={handleOpenModal} className="icon-btn-wrapper btn">
          <img src={plus} alt="" />
        </div>
        <div
          onClick={() => handleAll("START")}
          className="icon-btn-wrapper btn"
        >
          <img src={play} alt="" />
        </div>
        <div onClick={() => handleAll("STOP")} className="icon-btn-wrapper btn">
          <img src={stop} alt="" />
        </div>
        <div
          onClick={() => handleAll("DELETE")}
          className="icon-btn-wrapper btn"
        >
          <UseAnimations
            animation={trash2}
            strokeColor="#B60E0E"
            size={25}
            wrapperStyle={{ cursor: "pointer", paddingBottom: "2px" }}
          ></UseAnimations>
        </div>
        <div
          onClick={() => handleAll("LAUNCH")}
          className="btn-with-no-icon btn remove-btn"
        >
          <span>Launch All</span>
        </div>
      </div>
    </div>
  );
}

export default SpoofTopBtns;
