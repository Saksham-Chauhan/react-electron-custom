import React from "react";
import { useDispatch } from "react-redux";
import UseAnimations from "react-useanimations";
import add from "../../../assests/images/plus.svg";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import searchIcon from "../../../assests/images/search.svg";
import { setModalState } from "../../../features/counterSlice";

function TopBtnsWrapper() {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(setModalState("accountChangerModal"));
  };
  const handleDelete = () => {};

  const handlePlay = () => {};

  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container">
        <div className="page-top-search-container">
          <img src={searchIcon} alt="search-icon" />
          <input placeholder="Search" type="search" />
        </div>
        <div onClick={handleAdd} className="icon-btn-wrapper btn">
          <img src={add} alt="" />
        </div>
        <div onClick={handlePlay} className="icon-btn-wrapper btn">
          <img src={play} alt="" />
        </div>
        <div onClick={handleDelete} className="icon-btn-wrapper btn">
          <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
        </div>
      </div>
    </div>
  );
}

export default TopBtnsWrapper;
