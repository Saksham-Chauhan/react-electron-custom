import React from "react";
import { useDispatch } from "react-redux";
import UseAnimations from "react-useanimations";
import add from "../../../assests/images/plus.svg";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import searchIcon from "../../../assests/images/search.svg";
import { setModalState } from "../../../features/counterSlice";
import { deleteAllTableRow } from "../../../features/logic/acc-changer";

function TopBtnsWrapper({ search, handleSearching }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(setModalState("accountChangerModal"));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTableRow());
  };

  const handlePlayAll = () => {};

  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container">
        <div className="page-top-search-container">
          <img src={searchIcon} alt="search-icon" />
          <input
            value={search}
            onChange={handleSearching}
            placeholder="Search"
            type="search"
          />
        </div>
        <div onClick={handleAdd} className="icon-btn-wrapper btn">
          <img src={add} alt="" />
        </div>
        <div onClick={handlePlayAll} className="icon-btn-wrapper btn">
          <img src={play} alt="" />
        </div>
        <div onClick={handleDeleteAll} className="icon-btn-wrapper btn">
          <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
        </div>
      </div>
    </div>
  );
}

export default TopBtnsWrapper;
