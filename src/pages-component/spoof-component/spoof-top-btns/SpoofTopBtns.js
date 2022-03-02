import React from "react";
import { useDispatch } from "react-redux";
import play from "../../../assests/images/play.svg";
import plus from "../../../assests/images/plus.svg";
import stop from "../../../assests/images/stop.svg";
import trash from "../../../assests/images/trash.svg";
import searchIcon from "../../../assests/images/search.svg";
import { setModalState } from "../../../features/counterSlice";

function SpoofTopBtns() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setModalState("spoofModal"));
  };

  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container spoofer-page">
        <div className="page-top-search-container">
          <img src={searchIcon} alt="search-icon" />
          <input
            // value={search}
            // onChange={handleSearching}
            placeholder="Search"
            type="search"
          />
        </div>
        <div onClick={handleOpenModal} className="icon-btn-wrapper btn">
          <img src={plus} alt="" />
        </div>
        <div className="icon-btn-wrapper btn">
          <img src={play} alt="" />
        </div>
        <div className="icon-btn-wrapper btn">
          <img src={stop} alt="" />
        </div>
        <div className="icon-btn-wrapper btn">
          <img src={trash} alt="" />
        </div>
        <div className="btn-with-no-icon btn remove-btn">
          <span>Launch All</span>
        </div>
      </div>
    </div>
  );
}

export default SpoofTopBtns;
