import React from "react";
import "./InputGroup.css";
import searchIcon from "../../../assests/images/search.svg";
import trash from "../../../assests/images/trash.svg";
import test from "../../../assests/images/chemistry.svg";
import edit from "../../../assests/images/edit.svg";


const InputGroup = () => {
  return (
    <div style={{marginLeft:"20px"}} className="page-top-btns-wrapper">
      <div className="page-left-container">
        <div className="page-top-search-container">
          <img src={searchIcon} alt="search-icon" />
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
    </div>
  );
};

export default InputGroup;
