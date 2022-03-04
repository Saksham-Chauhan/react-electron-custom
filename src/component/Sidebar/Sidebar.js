import React, { useState } from "react";
import SidebarOption from "./SideBarOption/SidebarOption";
import "./Sidebar.css";
import { RoutePath } from "../../constant";
import logo from "../../assests/images/logo.svg";
import defaultUpdate from "../../assests/activeDefault/update-default.svg";
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
import { checkForUpdates } from "../../helper/electron-bridge";
const pjson  = require("../../../package.json")


const iconData = [
  {
    pageTo: RoutePath.home,
    activeIcon: activeDashboard,
  },
  {
    pageTo: RoutePath.oneclick,
    activeIcon: activeOneclick,
  },

  {
    pageTo: RoutePath.profile,
    activeIcon: activeProfile,
  },
  {
    pageTo: RoutePath.proxy,
    activeIcon: activeProxy,
  },
  {
    pageTo: RoutePath.accountGen,
    activeIcon: activeAccgen,
  },

  {
    pageTo: RoutePath.linkOpener,
    activeIcon: activeLinkOpener,
  },
  {
    pageTo: RoutePath.inviteJoiner,
    activeIcon: activeInvite,
  },
  {
    pageTo: RoutePath.spoofer,
    activeIcon: activeSpoof,
  },
  {
    pageTo: RoutePath.twitter,
    activeIcon: activeTwitter,
  },
  {
    pageTo: RoutePath.settings,
    activeIcon: activeSettings,
  },

];

const Sidebar = () => {
  const [active, setActive] = useState(0);

  const handleActivePage = (index) => {
    setActive(index);
  };

  return (
    <div className="sidebarMain">
      <div className="sidebarMain--logo-wrapper">
        <img src={logo} alt="logo" />
      </div>
      {iconData.map((data, idx) => (
        <SidebarOption
          key={idx}
          pageTo={data.pageTo}
          activeIcon={data.activeIcon}
          activeClassName={active === idx ? "activeLink" : ""}
          onClick={() => handleActivePage(idx)}
        />
      ))}
      <div className="updateIcon">
        <SidebarOption
          pageTo={"/appupdate"}
          defaultIcon={defaultUpdate}
          activeIcon={activeUpdate}
          onClick={() => checkForUpdates}
        />
        <p>V: {pjson.version}</p>
      </div>
    </div>
  );
};

export default Sidebar;
