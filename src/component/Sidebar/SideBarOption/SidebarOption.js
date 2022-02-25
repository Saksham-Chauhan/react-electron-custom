import React from "react";
import "./SidebarOption.css";
import { Link } from "react-router-dom";

const SideBarOption = ({
  defaultIcon = "",
  activeIcon,
  activeClassName = "",
  linkClassName = "link",
  pageTo,
  ...props
}) => {
  return (
    <Link
      {...props}
      to={pageTo}
      className={`sidebarOption ${linkClassName} ${activeClassName}`}
    >
      <img src={defaultIcon} alt="default-sidebar-icon" />
      <img src={activeIcon} alt="active-sidebar-icon" />
    </Link>
  );
};

export default SideBarOption;
