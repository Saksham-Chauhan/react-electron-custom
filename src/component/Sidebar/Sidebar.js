import React from "react";
import "./Sidebar.css";
import { RoutePath } from "../../constant";
import logo from "../../assests/images/logo.svg";
import SidebarOption from "./sidebar-option/SidebarOption";

// active icon import
import activeDashboard from "../../assests/activeDefault/dashboard-active.svg";
import activeAccgen from "../../assests/activeDefault/accgen-active.svg";
import activeOneclick from "../../assests/activeDefault/oneclick-active.svg";
import activeProxy from "../../assests/activeDefault/proxy-active.svg";
import activeLinkOpener from "../../assests/activeDefault/link-active.svg";
import activeProfile from "../../assests/activeDefault/profile-active.svg";
import activeTwitter from "../../assests/activeDefault/twitter-active.svg";
import activeSettings from "../../assests/activeDefault/settings-active.svg";
import activeUpdate from "../../assests/activeDefault/update-active.svg";
import activeSpoof from "../../assests/activeDefault/spoof-active.svg";
import activeInvite from "../../assests//activeDefault/invite-active.svg";

// default icon import
import defaultDashboard from "../../assests//activeDefault/dashboard-default.svg";
import defaultAccgen from "../../assests/activeDefault/accgen-default.svg";
import defaultOneclick from "../../assests/activeDefault/oneclick-default.svg";
import defaultProxy from "../../assests/activeDefault/proxy-default.svg";
import defaultLinkOpener from "../../assests/activeDefault/link-default.svg";
import defaultProfile from "../../assests/activeDefault/profile-default.svg";
import defaultInvite from "../../assests//activeDefault/invite-default.svg";
import defaultTwitter from "../../assests/activeDefault/twitter-default.svg";
import defaultSettings from "../../assests/activeDefault/settings-default.svg";
import defaultSpoof from "../../assests/activeDefault/spoof-default.svg";
import defaultUpdate from "../../assests/activeDefault/update-default.svg";

import { checkForUpdates } from "../../helper/electron-bridge";
const pjson = require("../../../package.json");

const iconData = [
  {
    to: RoutePath.home,
    activeIcon: activeDashboard,
    activeClass: "home",
    defaultIcon: defaultDashboard,
  },
  {
    to: RoutePath.oneclick,
    activeIcon: activeOneclick,
    activeClass: "oneclick",
    defaultIcon: defaultOneclick,
  },

  {
    to: RoutePath.profile,
    activeIcon: activeProfile,
    activeClass: "profile",
    defaultIcon: defaultProfile,
  },
  {
    to: RoutePath.proxy,
    activeIcon: activeProxy,
    activeClass: "proxy",
    defaultIcon: defaultProxy,
  },
  {
    to: RoutePath.accountGen,
    activeIcon: activeAccgen,
    activeClass: "account",
    defaultIcon: defaultAccgen,
  },

  {
    to: RoutePath.linkOpener,
    activeIcon: activeLinkOpener,
    activeClass: "linkopener",
    defaultIcon: defaultLinkOpener,
  },
  {
    to: RoutePath.inviteJoiner,
    activeIcon: activeInvite,
    activeClass: "invitejoiner",
    defaultIcon: defaultInvite,
  },
  {
    to: RoutePath.spoofer,
    activeIcon: activeSpoof,
    activeClass: "spoofer",
    defaultIcon: defaultSpoof,
  },
  {
    to: RoutePath.twitter,
    activeIcon: activeTwitter,
    activeClass: "twitter",
    defaultIcon: defaultTwitter,
  },
  {
    to: RoutePath.setting,
    activeIcon: activeSettings,
    activeClass: "setting",
    defaultIcon: defaultSettings,
  },
];

const Sidebar = () => {
  return (
    <div className="sidebarMain">
      <div className="sidebarMain--logo-wrapper">
        <img src={logo} alt="logo" />
      </div>
      <div className="sidebar-main-middle">
        {iconData.map((data, idx) => (
          <SidebarOption
            key={idx}
            pageTo={data.to}
            defaultIcon={data.defaultIcon}
            activeClass={data.activeClass}
            activeIcon={data.activeIcon}
          />
        ))}
      </div>
      <div className="sidebar-main-bottom">
        <SidebarOption
          isLink={false}
          defaultIcon={defaultUpdate}
          activeIcon={activeUpdate}
          activeClass="update"
        />
        <p>V: {pjson.version}</p>
      </div>
    </div>
  );
};

export default Sidebar;
