import React from "react";
import {
  ChartLabel,
  DashboardButton,
  DashboardChart,
} from "../../pages-component";
import "./dashboard.css";
import { TopWrapper, GroupStatusCard } from "../../component";

//IMPORT ROUTES
import { RoutePath } from "../../constant/index";

// IMPORT ICONS
import linkOpner from "../../assests/activeDefault/link-default.svg";
import invite from "../../assests/activeDefault/invite-default.svg";
import twitter from "../../assests/activeDefault/twitter-default.svg";
import spoof from "../../assests/activeDefault/spoof-default.svg";
import proxy from "../../assests/activeDefault/proxy-default.svg";
import settings from "../../assests/activeDefault/settings-default.svg";
import accgen from "../../assests/activeDefault/accgen-default.svg";
import oneclick from "../../assests/activeDefault/oneclick-default.svg";

//BUTTONS DATA
const buttonsData = [
  {
    to: RoutePath.linkOpener,
    image: linkOpner,
    text: "Link Opener",
    value: "39",
  },
  {
    to: RoutePath.inviteJoiner,
    image: invite,
    text: "Invite Joiner",
    value: "25",
  },
  {
    to: RoutePath.twitter,
    image: twitter,
    text: "Twitter Monitor",
    value: "8",
  },
  {
    to: RoutePath.spoofer,
    image: spoof,
    text: "Spoofer",
    value: "13",
  },
  {
    to: RoutePath.proxy,
    image: proxy,
    text: "Proxies",
    value: "88",
  },
  {
    to: RoutePath.setting,
    image: settings,
    text: "Settings",
    value: null,
  },
  {
    to: RoutePath.accountGen,
    image: accgen,
    text: "Account Gen",
    value: "Coming Soon",
  },
  {
    to: RoutePath.oneclick,
    image: oneclick,
    text: "One-Click",
    value: "Coming Soon",
  },
];
const DashboardPage = () => {
  return (
    <div className="dashboard">
      <TopWrapper>
        <GroupStatusCard title="Dasahboard" isHide={true} />
      </TopWrapper>
      <div className="dashboard-buttons">
        {buttonsData.map((item, i) => {
          return <DashboardButton {...item} key={i} />;
        })}
      </div>
      <div className="dashboard-chart">
        <DashboardChart />
        <ChartLabel />
      </div>
    </div>
  );
};
export default DashboardPage;
