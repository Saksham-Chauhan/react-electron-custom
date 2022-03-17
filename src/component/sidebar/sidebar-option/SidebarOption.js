import React from "react";
import "./styles.css";
import { NavLink as Link } from "react-router-dom";

const SideBarOption = ({
  activeIcon,
  defaultIcon,
  pageTo,
  activeClass,
  isLink = true,
  ...props
}) => {
  return isLink ? (
    <Link
      to={pageTo}
      className={({ isActive }) =>
        !isActive ? `sidebar-option ` : `sidebar-option active-link `
      }
    >
      <div className={`sidebar-option-inner bg-animation-css  ${activeClass} `}>
        <img src={defaultIcon} alt="active-sidebar-icon" />
        <img src={activeIcon} alt="active-sidebar-icon" />
        <div className="anim" />
      </div>
    </Link>
  ) : (
    <div {...props} className={`sidebar-option`}>
      <div className={`sidebar-option-inner bg-animation-css ${activeClass} `}>
        <img src={defaultIcon} alt="active-sidebar-icon" />
        <img src={activeIcon} alt="active-sidebar-icon" />
      </div>
    </div>
  );
};

export default SideBarOption;
