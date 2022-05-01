import React, { useEffect, useState } from "react";
import "./styles.css";
import wifi from "../../assests/images/wifi.svg";
import decline from "../../assests/images/decline.svg";
import inProcess from "../../assests/images/inProcess.svg";
import success from "../../assests/images/success.svg";
import { fetchThemsState } from "../../features/counterSlice";
import { useSelector } from "react-redux";
import { AppSpacer } from "..";

const StatusIcons = ({ Icon, appTheme, status }) => (
  <div className="stausIcons">
    <img src={Icon} alt="" />
    <span className={appTheme ? "lightMode_color " : ""}>{status}</span>
  </div>
);

function GroupCard({
  cardIcon = wifi,
  cardTitle = "",
  cardSubtitle = "",
  activeClass = "",
  hideSubText = false,
  isCustomAction = false,
  actionColumn,
  group,
  ...props
}) {
  const appTheme = useSelector(fetchThemsState);
  const [taskStataus, setTaskStatus] = useState({
    totalDecline: 0,
    totalSuccess: 0,
    totalTasks: 0,
  });
  useEffect(() => {
    const getStataus = () => {
      setTaskStatus({
        totalDecline: 0,
        totalSuccess: 0,
        totalTasks: 0,
      });
      group.minterList.map((item) => {
        if (item.status === "success") {
          setTaskStatus((pre) => {
            return { ...pre, totalSuccess: pre.totalSuccess + 1 };
          });
        }
        if (item.status === "failed" || item.status === "error") {
          setTaskStatus((pre) => {
            return { ...pre, totalDecline: pre.totalDecline + 1 };
          });
        }
        return null;
      });
      setTaskStatus((pre) => {
        return { ...pre, totalTasks: group.minterList.length };
      });
    };
    getStataus();
  }, [group]);

  return (
    <div {...props} className="group-card">
      <div
        className={
          appTheme
            ? `group-card-inner light-mode-card ${activeClass}`
            : `group-card-inner ${activeClass}`
        }
      >
        <div className="groupCard_heading">
          <img src={cardIcon} alt="" />
          <h5 className={appTheme ? "lightMode_color " : ""}>{cardTitle}</h5>
        </div>
        <AppSpacer spacer={13} />
        <div className="groupCard_Status">
          <StatusIcons
            Icon={inProcess}
            {...{ appTheme, status: taskStataus.totalTasks }}
          />
          <StatusIcons
            Icon={success}
            {...{ appTheme, status: taskStataus.totalSuccess }}
          />
          <StatusIcons
            Icon={decline}
            {...{ appTheme, status: taskStataus.totalDecline }}
          />
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
