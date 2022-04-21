import React from "react";
import "./dashboard.css";
import {
  ChartLabel,
  DashboardButton,
  DashboardChart,
} from "../../pages-component";
import {
  fetchSpoofTableList,
  fetchLatestTweetList,
} from "../../features/counterSlice";
import { useSelector } from "react-redux";
import { RoutePath } from "../../constant/index";
import { TopWrapper, GroupStatusCard } from "../../component";
import spoof from "../../assests/activeDefault/spoof-default.svg";
import oneclick from "../../assests/activeDefault/nft-default.svg";
import accChanger from "../../assests/activeDefault/profile-default.svg";
import twitter from "../../assests/activeDefault/twitter-default.svg";
import settings from "../../assests/activeDefault/settings-default.svg";

const DashboardPage = () => {
  const spoofList = useSelector(fetchSpoofTableList);
  const tweetsData = useSelector(fetchLatestTweetList);
  let twitterList = tweetsData ? Object.keys(tweetsData).length : null;

  const buttonsData = [
    {
      to: RoutePath.ethMinter,
      image: oneclick,
      text: "NFT Minter",
      value: "",
    },
    {
      to: RoutePath.accountChanger,
      image: accChanger,
      text: "Tasks",
      value: "",
    },
    {
      to: RoutePath.spoofer,
      image: spoof,
      text: "Spoofer",
      value: spoofList.length ? spoofList.length : "0",
    },
    {
      to: RoutePath.twitter,
      image: twitter,
      text: "Twitter Monitor",
      value: twitterList ? twitterList : "0",
    },

    {
      to: RoutePath.setting,
      image: settings,
      text: "Settings",
      value: null,
    },
  ];

  return (
    <div className="dashboard">
      <TopWrapper>
        <GroupStatusCard title="Dashboard" isHide={true} />
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
