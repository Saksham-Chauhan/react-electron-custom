import React, { useRef } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  // updateStatusOfTableRow,
  deleteDataFromTableList,
  updateTaskState,
} from "../../../features/logic/acc-changer";
import TableRow from "../table-row/TableRow";
import { toastWarning } from "../../../toaster";
import { getProxy } from "../../../api";

import {
  readArrayOfJson,
  startGiveawayJoiner,
  startInviteJoinerMonitor,
  startLinkOpenerMonitor,
  stopGiveawayJoiner,
  stopInviteJoinerMonitor,
  stopLinkOpenerMonitor,
  stopXpFarmer,
} from "../../../helper/electron-bridge";

import xpFarmer from "../../../api/account-changer/xp-farmer";
import {
  fetchLoggedUserDetails,
  fetchThemsState,
  fetchWebhookListState,
  fetchWebhookSettingState,
} from "../../../features/counterSlice";
import {
  useActivityChanger,
  useAvatarChanger,
  useMassInviteJoiner,
  useNickNameChanger,
  usePasswordChanger,
  useServerLeaver,
  useTokeChecker,
  useTokenRetriever,
  useUserName,
} from "../../../hooks/discord-api";
import { sleep } from "../../../helper";

let status = false;

function TableSection({ list }) {
  const massjoiner = useMassInviteJoiner();
  const serverLeaver = useServerLeaver();
  const activityChanger = useActivityChanger();
  const userName = useUserName();
  const nickName = useNickNameChanger();
  const tokenRetriever = useTokenRetriever();
  const avatarChanger = useAvatarChanger();
  const tokenChecker = useTokeChecker();
  const passwordChanger = usePasswordChanger();
  const setting = useSelector(fetchWebhookSettingState);
  const user = useSelector(fetchLoggedUserDetails);
  const webhookList = useSelector(fetchWebhookListState);

  let flag = useRef(false);
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const theme = {
    tableHeader: appTheme
      ? "acc-chnager-page-table-header light-mode-sidebar"
      : "acc-chnager-page-table-header",
  };

  const handleDelete = (obj) => {
    dispatch(deleteDataFromTableList(obj));
  };

  const handlePlay = async (obj) => {
    flag.current = !flag.current;
    status = flag.current;
    const type = obj["changerType"];
    if (type === "massInviter") {
      await massjoiner(obj, setting, user, webhookList);
    } else if (type === "serverLeaver") {
      await serverLeaver(obj, setting, user, webhookList);
    } else if (type === "usernameChanger") {
      await userName(obj, setting, user, webhookList);
    } else if (type === "activityChanger") {
      await activityChanger(obj, setting, user, webhookList);
    } else if (type === "nicknameChanger") {
      await nickName(obj, setting, user, webhookList);
    } else if (type === "passwordChanger") {
      await passwordChanger(obj, setting, user, webhookList);
    } else if (type === "tokenChecker") {
      await tokenChecker(obj, setting, user, webhookList);
    } else if (type === "tokenRetrieve") {
      await tokenRetriever(obj, setting, user, webhookList);
    } else if (type === "avatarChanger") {
      await avatarChanger(obj, setting, user, webhookList);
    } else if (type === "xpFarmer") {
      const { proxyGroup } = obj;
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      if (status) {
        const res = await callApis(
          proxy,
          obj.channelId,
          obj.monitorToken,
          obj.delay
        );
        return res;
      } else return null;
    } else if (type === "linkOpener") {
      startLinkOpenerMonitor(obj, setting, user, webhookList);
    } else if (type === "inviteJoiner") {
      startInviteJoinerMonitor(obj, setting, user, webhookList);
    } else if (type === "giveawayJoiner") {
      dispatch(
        updateTaskState({ id: obj.id, status: "Monitoring", active: true })
      );
      startGiveawayJoiner(obj);
    }
    // callWebhook(obj);
  };

  const handleDownload = (obj) => {
    let arrOfObj = [];
    const type = obj["changerType"];
    if (type === "passwordChanger") {
      const { username, newPass } = obj;
      let userNameArr = username.split("\n");
      let passArr = newPass.split("\n");
      for (let i = 0; i < userNameArr.length; i++) {
        let obj = {};
        obj["newPassword"] = passArr[i];
        obj["userName"] = userNameArr[i];
        arrOfObj.push(obj);
      }
      readArrayOfJson(arrOfObj);
    }
    if (type === "tokenRetrieve") {
      const { newToken, email } = obj;
      let tokenArr = newToken.split("\n");
      let newEmail = email.split("\n");
      for (let i = 0; i < newEmail.length; i++) {
        let obj = {};
        obj["token"] = tokenArr[i];
        obj["email"] = newEmail[i];
        arrOfObj.push(obj);
      }
      readArrayOfJson(arrOfObj);
    }
  };

  const handleStop = (obj) => {
    flag.current = !flag.current;
    status = flag.current;
    const type = obj["changerType"];
    if (type === "xpFarmer") {
      stopXpFarmer();
      updateTaskState({ id: obj.id, status: "Stopped", active: false });
    } else if (type === "giveawayJoiner") {
      console.log("stop", obj.id);
      stopGiveawayJoiner(obj.id);
    } else if (type === "linkOpener") {
      stopLinkOpenerMonitor(obj.id);
    } else if (type === "inviteJoiner") {
      stopInviteJoinerMonitor(obj.id);
    } else {
      updateTaskState({ id: obj.id, status: "Stopped", active: false });
    }
  };

  return (
    <div className="acc-changer-page-table-section">
      <div className="acc-chnager-table-header-parent">
        <div className={theme.tableHeader}>
          <div>#</div>
          <div>{"Discord Accounts"}</div>
          <div>Type</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
      </div>
      <div className="acc-changer-table-scroller">
        {list?.map((obj, index) => (
          <TableRow
            index={index + 1}
            onDelete={handleDelete}
            onPlay={handlePlay}
            onStop={handleStop}
            onDownload={handleDownload}
            selectedCard={obj}
            {...{ obj }}
            key={obj.id}
          />
        ))}
      </div>
    </div>
  );
}

export default TableSection;

export const callApis = async (proxy, channelID, token, delay = "") => {
  let response = null;
  let delayTime = delay ? delay : 1000;
  response = await xpFarmer(proxy, channelID, token);
  await sleep(delayTime);
  if (status) {
    callApis(proxy, channelID, token, delayTime);
  }
  if (response.status === 200) {
    return response;
  } else {
    if (!token) {
      toastWarning("Invalid format, token not found in Discord Accounts");
    } else {
      toastWarning(response.response.data.message);
    }
  }
  return null;
};
