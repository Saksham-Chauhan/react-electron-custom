import React, { useEffect, useRef } from "react";
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
  addDiscordSpoofer,
  deleteDiscordSpoofer,
  errorInProxy,
  readArrayOfJson,
  startGiveawayJoiner,
  startInviteJoinerMonitor,
  startLinkOpenerMonitor,
  startXpFarmer,
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
  const dispatch = useDispatch();
  useEffect(() => {
    errorInProxy((data) => {
      toastWarning("Error proxy not found");
      dispatch(
        updateTaskState({ id: data.id, status: "Stopped", active: false })
      );
    });
  }, [dispatch]);

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
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
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
      startXpFarmer(obj);
    } else if (type === "linkOpener") {
      startLinkOpenerMonitor(obj, setting, user, webhookList);
    } else if (type === "inviteJoiner") {
      startInviteJoinerMonitor(obj, setting, user, webhookList);
    } else if (type === "giveawayJoiner") {
      dispatch(
        updateTaskState({ id: obj.id, status: "Monitoring", active: true })
      );
      startGiveawayJoiner(obj);
    } else if (type === "discordSpoofer") {
      addDiscordSpoofer(obj);
    }
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
    flag.current = false;
    status = flag.current;
    const type = obj["changerType"];
    if (type === "xpFarmer") {
      stopXpFarmer(obj);
      dispatch(
        updateTaskState({ id: obj.id, status: "Stopped", active: false })
      );
    } else if (type === "giveawayJoiner") {
      stopGiveawayJoiner(obj.id);
    } else if (type === "linkOpener") {
      stopLinkOpenerMonitor(obj.id);
    } else if (type === "inviteJoiner") {
      stopInviteJoinerMonitor(obj.id);
    } else if (type === "discordSpoofer") {
      deleteDiscordSpoofer({ claimer: obj.claimerGroup, id: obj.id });
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

export const callApis = async (proxyGroup, channelID, token, delay = "") => {
  const proxy = getProxy(proxyGroup["value"].split("\n"));
  let response = null;
  let delayTime = delay ? delay : 1000;
  response = await xpFarmer(proxy, channelID, token);
  await sleep(delayTime);
  if (status) {
    callApis(proxyGroup, channelID, token, delayTime);
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
