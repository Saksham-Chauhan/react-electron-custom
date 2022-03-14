import React from "react";
import {
  DashboardChartLabel,
  DashboardButton,
  DashboardChart,
} from "../../pages-component";
import "./dashboard.css";
import { TopWrapper, GroupStatusCard } from "../../component";

//IMPORT ROUTES
import { RoutePath } from "../../constant/index";

// IMPORT ICONS
import linkOpner from "../../assests/activeDefault/link-default.svg";
import twitter from "../../assests/activeDefault/twitter-default.svg";
import spoof from "../../assests/activeDefault/spoof-default.svg";
import proxy from "../../assests/activeDefault/proxy-default.svg";
import settings from "../../assests/activeDefault/settings-default.svg";
import accgen from "../../assests/activeDefault/accgen-default.svg";
import oneclick from "../../assests/activeDefault/oneclick-default.svg";
import invite from "../../assests/images/discord-dash.svg";
import { useSelector } from "react-redux";
import {
  fetchClaimerDiscordAccountList,
  fetchDiscordAccountList,
  fetchProxyGroupList,
  fetchSpoofTableList,
  fetchTwitterKeywordList,
} from "../../features/counterSlice";
import { ComingSoon } from "../../modals";
const DashboardPage = () => {
  //GET PROXY LIST
  const proxyList = useSelector(fetchProxyGroupList);

  //GET STATE OF LINK OPNER
  const linkOpnerList = useSelector(fetchDiscordAccountList);

  //GET STATE OF INVITE JOINER
  const inviteJoinerList = useSelector(fetchClaimerDiscordAccountList);

  //GET STATE OF TWITTER
  const twitterList = useSelector(fetchTwitterKeywordList);

  //GET STATE OF TWITTER
  const spoofList = useSelector(fetchSpoofTableList);

  //RETURN THE TOTAL PROXIES
  const getTotalProxy = () => {
    let totalProxy = 0;
    for (let i = 0; i < proxyList.length; i++) {
      totalProxy += proxyList[i].proxyList.length;
    }
    return totalProxy;
  };

  //BUTTONS DATA
  const buttonsData = [
    {
      to: RoutePath.linkOpener,
      image: linkOpner,
      text: "Link Opener",
      value: linkOpnerList.length,
    },
    {
      to: RoutePath.inviteJoiner,
      image: invite,
      text: "Invite Joiner",
      value: inviteJoinerList.length,
    },
    {
      to: RoutePath.twitter,
      image: twitter,
      text: "Twitter Monitor",
      value: twitterList.length ? twitterList.length : "0",
    },
    {
      to: RoutePath.spoofer,
      image: spoof,
      text: "Spoofer",
      value: spoofList.length ? twitterList.length : "0",
    },
    {
      to: RoutePath.proxy,
      image: proxy,
      text: "Proxies",
      value: getTotalProxy(),
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

  return (
    <div className="dashboard">
      {/* <ComingSoon /> */}
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
        <DashboardChartLabel />
      </div>
    </div>
  );
};
export default DashboardPage;
