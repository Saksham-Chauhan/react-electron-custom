import React from "react";
import "./styles.css";
import TableRow from "../table-row/TableRow";
import { useDispatch } from "react-redux";
import { deleteDataFromTableList } from "../../../features/logic/acc-changer";
import avatarChangeAPI from "../../../api/account-changer/avatar-changer";
import serverLeaverAPI from "../../../api/account-changer/leave-server";
import usernameChangerAPI from "../../../api/account-changer/username-changer";
import activityChangerAPI from "../../../api/account-changer/activity-changer";
import nicknameChangerAPI from "../../../api/account-changer/nickname-changer";
import passwordChangerAPI from "../../../api/account-changer/password-changer";
import tokenCheckerAPI from "../../../api/account-changer/token-checker";
import { generateRandomAvatar } from "../../../api";
import { current } from "@reduxjs/toolkit";

function TableSection({ selectedCard }) {
  const dispatch = useDispatch();

  const handleDelete = (obj) => {
    dispatch(deleteDataFromTableList(obj));
  };
  // email:username:password:token
  const handlePlay = async (obj) => {
    const type = selectedCard["chnagerType"];
    const { proxyGroup, claimerGroup } = obj;
    const tokenArray = claimerGroup["value"]?.split("\n");
    for (let index = 0; index < tokenArray.length; index++) {
      const token = tokenArray[index];
      const tokenArr = token?.split(":");
      const proxyArray = [...proxyGroup["value"].split("\n")];
      for (let j = 0; j < proxyArray.length; j++) {
        let proxySplit = proxyArray[j]?.split(":");
        const proxy = {
          host: proxySplit[0],
          port: proxySplit[1],
          auth: {
            username: proxySplit[2],
            password: proxySplit[3],
          },
        };
        const apiResponse = await apiCallToDiscord({ type, token, proxy });
      }
    }
  };

  return (
    <div className="acc-changer-page-table-section">
      <div className="acc-chnager-table-header-parent">
        <div className="acc-chnager-page-table-header">
          <div>#</div>
          <div>Token Group</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
      </div>
      <div className="acc-changer-table-scroller">
        {selectedCard?.list?.map((obj, index) => (
          <TableRow
            index={index + 1}
            onDelete={handleDelete}
            onPlay={handlePlay}
            {...{ obj }}
            key={obj.id}
          />
        ))}
      </div>
    </div>
  );
}

export default TableSection;

const apiCallToDiscord = async ({
  type,
  token,
  proxy,
  guildId,
  password,
  activityDetail,
  nickName,
  currentPass,
  newPass,
}) => {
  if (type === "avatarChanger") {
    const randomImage = await generateRandomAvatar();
    const response = await avatarChangeAPI(token, randomImage, proxy);
    if (response !== null) {
      if (response.status === 200) return response;
    } else return null;
  } else if (type === "serverLeaver") {
    const response = await serverLeaverAPI(token, guildId, proxy);
    if (response !== null) {
      if (response.status === 200) return response;
    } else return null;
  } else if (type === "usernameChanger") {
    const response = await usernameChangerAPI(token, password);
    if (response !== null) {
      if (response.status === 200) return response;
    } else return null;
  } else if (type === "activityChanger") {
    const response = await activityChangerAPI(token, activityDetail, proxy);
    if (response !== null) {
      if (response.status === 200) return response;
    } else return null;
  } else if (type === "nicknameChanger") {
    const response = await nicknameChangerAPI(token, guildId, nickName, proxy);
    if (response !== null) {
      if (response.status === 200) return response;
    } else return null;
  } else if (type === "passwordChanger") {
    const response = await passwordChangerAPI(
      token,
      currentPass,
      newPass,
      proxy
    );
    if (response !== null) {
      if (response.status === 200) return response;
    } else return null;
  } else if (type === "tokenChecker") {
    const response = await tokenCheckerAPI(token, proxy);
    if (response !== null) {
      if (response.status === 200) return response;
    } else return null;
  } else if (type === "massInviter") {
  }
};
