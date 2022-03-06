import React from "react";
import "./InputGroup.css";
import searchIcon from "../../../assests/images/search.svg";
import UseAnimations from 'react-useanimations';
import trash2 from 'react-useanimations/lib/trash2';
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
        <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} wrapperStyle={{cursor:"pointer"}}></UseAnimations>
        </div>
      </div>
    </div>
  );
};

export default InputGroup;
