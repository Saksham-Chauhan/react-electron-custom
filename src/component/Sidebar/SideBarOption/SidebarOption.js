import React from "react";
import "./SidebarOption.css";
import { Link } from "react-router-dom";

import { RoutePath } from "../../../constant";

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
      className={`sidebarOption ${linkClassName} ${activeClassName} nav__item `}
    >
      {/* <img src={defaultIcon} alt="default-sidebar-icon" /> */}

      {activeClassName ? (
        <div className="activeimage">
          <img src={activeIcon} alt="active-sidebar-icon" />
        </div>
      ) : (
        <div
          className={
            pageTo === RoutePath.home
              ? "home_animation "
              : pageTo === RoutePath.oneclick
              ? "OneClick_animation"
              : pageTo === RoutePath.profile
              ? "Profile_animation"
              : pageTo === RoutePath.proxy
              ? "Proxy_animation"
              : pageTo === RoutePath.accountGen
              ? "AccounGen_animation"
              : pageTo === RoutePath.linkOpener
              ? "linkOpner_animation"
              : pageTo === RoutePath.inviteJoiner
              ? "inviteJoiner_animation"
              : pageTo === RoutePath.spoofer
              ? "spoofer_animation"
              : pageTo === RoutePath.twitter
              ? "twitter_animation"
              : pageTo === RoutePath.settings
              ? "setting_animation"
              : pageTo === "/appupdate"
              ? "update_animation"
              : ""
          }
        ></div>
      )}

      {/* <div className="OneClick_animation"></div> */}
    </Link>
  );
};

export default SideBarOption;

// pageTo === "/proxy"
//   ? "Proxy_animation"
//   : pageTo === "/linkOpener"
//   ? "Link_animation"
//   : pageTo === "/oneclick"
//   ? "oneclick_animation"
//   : pageTo === "/account"
//   ? "account_animation"
//   : "";
