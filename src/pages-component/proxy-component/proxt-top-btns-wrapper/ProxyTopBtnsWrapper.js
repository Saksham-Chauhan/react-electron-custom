import React from "react";
import search from "../../../assests/images/search.svg";
import trash from "../../../assests/images/trash.svg";
import edit from "../../../assests/images/edit.svg";
import test from "../../../assests/images/chemistry.svg";
import exportIcon from "../../../assests/images/export.svg"
import importIcon from "../../../assests/images/import.svg"
import "./styles.css";
function ProxyTopBtnsWrapper() {
  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container">
        <div className="page-top-search-container">
          <img src={search} alt="search-icon" />
          <input placeholder="Search" type="search" />
        </div>
        <div className="icon-btn-wrapper btn">
          <img src={test} alt="" />
        </div>
        <div className="icon-btn-wrapper btn">
          <img src={edit} alt="" />
        </div>
        <div className="icon-btn-wrapper btn">
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
