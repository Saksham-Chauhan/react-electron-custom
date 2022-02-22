import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import test from "../../../assests/images/chemistry.svg";
import searchIcon from "../../../assests/images/search.svg";
import exportIcon from "../../../assests/images/export.svg";
import importIcon from "../../../assests/images/import.svg";
import { deleteProxyGroup } from "../../../features/logic/proxy";

function ProxyTopBtnsWrapper({ search, handleSearching }) {
  const dispatch = useDispatch();

  const handleDeleteGroup = () => {
    dispatch(deleteProxyGroup());
  };

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
        <div className="icon-btn-wrapper btn">
          <img src={test} alt="" />
        </div>
        <div className="icon-btn-wrapper btn">
          <img src={edit} alt="" />
        </div>
        <div onClick={handleDeleteGroup} className="icon-btn-wrapper btn">
          <img src={trash} alt="" />
        </div>
      </div>
      <div className="page-right-container">
        <div className="remove-btn btn">
          <img src={trash} alt="" />
          <span>Remove Bad Proxies</span>
        </div>
        <div className="icon-btn-wrapper btn">
          <img src={importIcon} alt="" />
        </div>
        <div className="icon-btn-wrapper btn">
          <img src={exportIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ProxyTopBtnsWrapper;
