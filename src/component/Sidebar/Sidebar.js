import React, { useEffect } from "react";
import SidebarOption from "./SideBarOption/SidebarOption";
import "./Sidebar.css";
// deafault Icone
import logo from "../../assests/sidebarImage/logo.svg";
import dashboard from "../../assests/sidebarImage/dashboard.svg";
import oneClick from "../../assests/sidebarImage/oneClick.svg";
import acountIcon from "../../assests/sidebarImage/acountIcon.svg";
import proxy from "../../assests/sidebarImage/proxy.svg";
import link_opner from "../../assests/sidebarImage/link_opner.svg";
import twitter from "../../assests/sidebarImage/twitter.svg";
import settings from "../../assests/sidebarImage/settings.svg";
import AppUpdate from "../../assests/sidebarImage/AppUpdate.svg";
import Browser from "../../assests/sidebarImage/Browser.svg";
import discordIcon from "../../assests/sidebarImage/discordIcon.svg";
import harvester from "../../assests/sidebarImage/harvester.svg";

// active Icons
import activeOneClick from "../../assests/sidebarImage/activeOneClick.svg";
import ActiveProxy from "../../assests/sidebarImage/activeProxy.svg";
import activeLinkOpner from "../../assests/sidebarImage/activeLinkOpner.svg";
import activeAcountIcon from "../../assests/sidebarImage/activeAcountIcon.svg";
import activeDashboard from "../../assests/sidebarImage/activeDashboard.svg";
import activeTwitter from "../../assests/sidebarImage/activeTwitter.svg";
import activeSettings from "../../assests/sidebarImage/activeSettings.svg";
import activeUpdate from "../../assests/sidebarImage/activeUpdate.svg";
import activeBrowser from "../../assests/sidebarImage/activeBrowser.svg";
import activeDiscord from "../../assests/sidebarImage/activeDiscord.svg";
import acticveHarvester from "../../assests/sidebarImage/acticveHarvester.svg";

import { RoutePath } from "../../constant";

const iconData = [
  {
    pageTo: RoutePath.oneclick,
    defaultIcon: oneClick,
    activeIcon: activeOneClick,
  },
  {
    pageTo: "/harvester",
    defaultIcon: harvester,
    activeIcon: acticveHarvester,
  },
  {
    pageTo: RoutePath.proxy,
    defaultIcon: proxy,
    activeIcon: ActiveProxy,
  },
  {
    pageTo: "/profiles",
    defaultIcon: acountIcon,
    activeIcon: activeAcountIcon,
  },
  {
    pageTo: "/linkOpner",
    defaultIcon: link_opner,
    activeIcon: activeLinkOpner,
  },
  {
    pageTo: "/discord",
    defaultIcon: discordIcon,
    activeIcon: activeDiscord,
  },
  {
    pageTo: "/browser",
    defaultIcon: Browser,
    activeIcon: activeBrowser,
  },
  {
    pageTo: "/twitter",
    defaultIcon: twitter,
    activeIcon: activeTwitter,
  },
  {
    pageTo: "/settings",
    defaultIcon: settings,
    activeIcon: activeSettings,
  },
];

const Sidebar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".sidebarOption.link");
    links.forEach((link, index) => {
      link.addEventListener("click", () => {
        let current = document.getElementsByClassName("activeLink");
        current[0].className = current[0].className.replace("activeLink", "");
        link.classList.add("activeLink");
      });
    });
  }, []);

  return (
    <div className="sidebarMain">
      <div className="sidebarMain--logo-wrapper">
        <img src={logo} alt="kyrs-logo" />
      </div>

      <SidebarOption
        pageTo="/harvester"
        defaultIcon={dashboard}
        activeIcon={activeDashboard}
        activeClassName="activeLink"
      />

      {iconData.map((data, idx) => (
        <SidebarOption
          key={idx}
          pageTo={data.pageTo}
          defaultIcon={data.defaultIcon}
          activeIcon={data.activeIcon}
        />
      ))}

      <div className="updateIcon">
        <SidebarOption
          pageTo={"/appupdate"}
          defaultIcon={AppUpdate}
          activeIcon={activeUpdate}
        />
        <p>V: 0.0.1</p>
      </div>
    </div>
  );
};

export default Sidebar;
