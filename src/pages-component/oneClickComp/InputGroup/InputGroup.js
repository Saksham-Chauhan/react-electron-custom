import React from "react";
import "./InputGroup.css";
import plus from "../../../assests/images/plus.svg";
import searchIcon from "../../../assests/sidebarImage/searchIcon.svg";
import deleteIcon from "../../../assests/sidebarImage/deleteIcon.svg";

const Button = ({ icon }) => (
  <div className="group-title btn">
    <img src={icon} alt="icon" />
  </div>
);

const InputGroup = () => {
  return (
    <div className="search_feild">
      <div className="searchIcon">
        <img src={searchIcon} alt="SearchIcon" />
      </div>

      <input type="text" name="Search" placeholder="Search" />
      <Button icon={plus} />
      <Button icon={deleteIcon} />
    </div>
  );
};

export default InputGroup;
