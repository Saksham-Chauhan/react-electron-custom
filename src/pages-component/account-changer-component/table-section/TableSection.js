import React, { useRef } from "react";
import "./styles.css";
import Chance from "chance";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStatusOfTableRow,
  deleteDataFromTableList,
  updatePasswordChangerStatus,
} from "../../../features/logic/acc-changer";
import TableRow from "../table-row/TableRow";
import { toastWarning } from "../../../toaster";
import { directDiscordJoinAPI, generateRandomAvatar } from "../../../api";
import { generateRandomPassword, sleep } from "../../../helper";
import {
  readArrayOfJson,
  startInviteJoinerMonitor,
  startLinkOpenerMonitor,
  startXpFarmer,
  stopInviteJoinerMonitor,
  stopLinkOpenerMonitor,
  stopXpFarmer,
} from "../../../helper/electron-bridge";
import serverLeaverAPI from "../../../api/account-changer/leave-server";
import tokenCheckerAPI from "../../../api/account-changer/token-checker";
import avatarChangeAPI from "../../../api/account-changer/avatar-changer";
import usernameChangerAPI from "../../../api/account-changer/username-changer";
import activityChangerAPI from "../../../api/account-changer/activity-changer";
import nicknameChangerAPI from "../../../api/account-changer/nickname-changer";
import passwordChangerAPI from "../../../api/account-changer/password-changer";
import tokenChanger from "../../../api/account-changer/token-changer";
import { toastInfo } from "../../../toaster";
import { replyList } from "../../../constant";
import xpFarmer from "../../../api/account-changer/xp-farmer";
import {
  fetchLoggedUserDetails,
  fetchTaskTableListState,
  fetchThemsState,
  fetchWebhookListState,
  fetchWebhookSettingState,
} from "../../../features/counterSlice";
import { sendWebhook } from "../../../features/logic/setting";

const { Client } = window.require("discord.js-selfbot");

let status = false;

function TableSection({ list }) {
  const setting = useSelector(fetchWebhookSettingState);
  const user = useSelector(fetchLoggedUserDetails);
  const webhookList = useSelector(fetchWebhookListState);
  const accChangerList = useSelector(fetchTaskTableListState);

  let counter = {
    total: 0,
    success: 0,
  };

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
    if (type === "giveawayJoiner" && obj.status !== "Monitoring") {
      const monitor = new Client();
      monitor.login(obj.token);
      try {
        monitor.on("ready", () => {
          toastInfo("Giveaway Joiner ready!!");
          dispatch(updateStatusOfTableRow(obj, "Monitoring"));
        });
        monitor.on("message", async (message) => {
          const embed = message.embeds[0];
          const serverId = message.channel.guild.id;
          const authorId = message.author.id;
          if (serverId === obj.serverid) {
            if (authorId === obj.botid) {
              if (
                embed.title.toLowerCase().includes("google") &&
                embed.description.toLowerCase().includes("search")
              ) {
                await message.react("🎉");
                let x = Math.floor(Math.random() * replyList.length + 1);
                message.channel.startTyping();
                setTimeout(function () {
                  message.channel.stopTyping();
                  message.channel.send(replyList[x]);
                }, obj.delay);
              }
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      let ind = 0;
      const { proxyGroup, claimerGroup } = obj;
      const tokenArray = claimerGroup["value"]?.split("\n");
      if (type === "linkOpener") {
        startLinkOpenerMonitor(obj);
      } else if (type === "inviteJoiner") {
        startInviteJoinerMonitor(obj);
      } else {
        if (type === "xpFarmer") {
          dispatch(updateStatusOfTableRow(obj, "Running"));
          startXpFarmer();
          await sleep(3);
        }
        if (
          obj.claimerGroup.value.split("\n").length >
          obj.proxyGroup.value.split("\n").length
        )
          toastWarning("You might get banned as Proxies are less than Tokens");
        counter.total = tokenArray.length;
        for (let index = 0; index < tokenArray.length; index++) {
          const token = tokenArray[index];
          const tokenArr = token?.split(":");
          const proxyArray = proxyGroup["value"].split("\n");
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
            dispatch(updateStatusOfTableRow(obj, "Running"));
            await sleep(obj.delay);
            const apiResponse = await apiCallToDiscord({
              type,
              token: tokenArr[2],
              proxy,
              username: obj.username,
              password: tokenArr[1],
              guildId: obj.serverIDs,
              activityDetail: obj.activityDetails,
              nickName: obj.nicknameGenerate,
              newPass: obj.commonPassword,
              invideCodes: obj.inviteCodes,
              avatarAPI: obj.apiInfo,
              email: tokenArr[0],
              channelID: obj.channelId,
              delay: obj.delay,
              settingObj: obj,
              emojiValue: obj.emojiValue,
              userStatus: obj.userStatus,
            });
            if (apiResponse !== null) {
              if (apiResponse.status === 200 || apiResponse.status === 204) {
                counter.success = counter.success + 1;
                let tempObj = { ...obj };
                let arr = [];
                let user = [];
                let emailArr = [];

                if (type === "passwordChanger" || type === "tokenRetrieve") {
                  if (type === "passwordChanger") {
                    let newPass = JSON.parse(apiResponse.config.data)[
                      "new_password"
                    ];
                    let tempuser = apiResponse.data.username;
                    arr.push(newPass);
                    user.push(tempuser);
                    if (index > 0) {
                      arr = [...tempObj["newPass"].split("\n"), ...arr];
                      user = [...tempObj["username"].split("\n"), ...user];
                    }
                    tempObj["newPass"] = arr.join("\n");
                    tempObj["username"] = user.join("\n");
                    tempObj["status"] = "Completed";
                    dispatch(updatePasswordChangerStatus(tempObj));
                  }

                  if (type === "tokenRetrieve") {
                    let newToken = apiResponse.data.token;
                    arr.push(newToken);
                    user.push(tokenArr[1]);
                    emailArr.push(tokenArr[0]);
                    if (ind > 0) {
                      arr = [...tempObj["newToken"].split("\n"), ...arr];
                      user = [...tempObj["newUsername"].split("\n"), ...user];
                      emailArr = [...tempObj["email"].split("\n"), ...user];
                    }
                    tempObj["newToken"] = arr.join("\n");
                    tempObj["newUsername"] = user.join("\n");
                    tempObj["email"] = emailArr.join("\n");
                    tempObj["status"] = "Completed";
                    dispatch(updatePasswordChangerStatus(tempObj));
                    ind = ind + 1;
                  }
                } else {
                  dispatch(updateStatusOfTableRow(tempObj, "Completed"));
                }
                break;
              }
            } else {
              dispatch(updateStatusOfTableRow(obj, "Stopped"));
            }
          }
        }
      }
    }
    callWebhook(obj);
  };
  const callWebhook = (obj) => {
    let tempObj = {};
    for (let i = 0; i < accChangerList.length; i++) {
      if (accChangerList[i].id === obj.id) {
        tempObj = { ...accChangerList[i] };
      }
    }
    sendWebhook(
      tempObj,
      "TASKS",
      obj.changerType,
      setting,
      user,
      webhookList,
      counter
    );
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
      const { newToken, newUsername, email } = obj;
      let userNameArr = newUsername.split("\n");
      let tokenArr = newToken.split("\n");
      let newEmail = email.split("\n");
      for (let i = 0; i < userNameArr.length; i++) {
        let obj = {};
        obj["token"] = tokenArr[i];
        obj["password"] = userNameArr[i];
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
      dispatch(updateStatusOfTableRow(obj, "Stopped"));
    }
    if (type === "linkOpener") {
      stopLinkOpenerMonitor(obj.id);
    } else if (type === "inviteJoiner") {
      stopInviteJoinerMonitor(obj.id);
    } else {
      dispatch(updateStatusOfTableRow(obj, "Stopped"));
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

export const apiCallToDiscord = async ({
  type,
  token,
  proxy,
  guildId,
  password,
  activityDetail,
  nickName,
  newPass,
  username,
  invideCodes,
  avatarAPI,
  email,
  channelID,
  delay,
  settingObj,
  emojiValue,
  userStatus,
}) => {
  const tokenMsg = "Invalid format, Token not found in Discord Accounts.";
  const passMsg = "Invalid format, Password not found.";
  const emailMsg = "Invalid format, Email not found.";
  if (type === "avatarChanger") {
    let response;
    let randomImage;
    if (avatarAPI?.label === "Default API" || avatarAPI?.label === undefined) {
      randomImage = await generateRandomAvatar();
    } else {
      randomImage = await generateRandomAvatar(avatarAPI.value);
    }
    response = await avatarChangeAPI(token, randomImage, proxy);
    if (response.status === 200) {
      return response;
    } else {
      if (!token) {
        toastWarning(tokenMsg);
        return null;
      }
      if (!randomImage) {
        toastWarning("Invalid format, please select API.");
        return null;
      }
      toastWarning(response.response.data.message);
      return null;
    }
  } else if (type === "serverLeaver") {
    let serverIdArray;
    try {
      serverIdArray = guildId.split("\n");
    } catch (e) {
      toastWarning("Server id is blank.");
      return null;
    }
    for (let i = 0; i < serverIdArray.length; i++) {
      const response = await serverLeaverAPI(token, serverIdArray[i], proxy);
      if (response.status === 200 || response.status === 204) {
        return response;
      } else {
        if (!token) {
          toastWarning(tokenMsg);
        } else {
          toastWarning(response.response.data.message);
        }
        return null;
      }
    }
  } else if (type === "usernameChanger") {
    let name = username;
    const chance = new Chance();
    if (!name) {
      name = chance.name();
    }
    const response = await usernameChangerAPI(token, password, proxy, name);
    if (response.status === 200) {
      return response;
    } else {
      if (!token) {
        toastWarning(tokenMsg);
      } else {
        if (!password) {
          toastWarning(passMsg);
        } else toastWarning(response.response.data.message);
      }
      return null;
    }
  } else if (type === "activityChanger") {
    const response = await activityChangerAPI(
      token,
      activityDetail,
      emojiValue,
      userStatus,
      proxy
    );
    if (response.status === 200) {
      return response;
    } else {
      if (!token) {
        toastWarning(tokenMsg);
      } else {
        toastWarning(response.response.data.message);
      }
      return null;
    }
  } else if (type === "nicknameChanger") {
    let serverIdArray = guildId.split("\n");
    let name = nickName.split("\n");
    for (let i = 0; i < serverIdArray.length; i++) {
      const response = await nicknameChangerAPI(
        token,
        serverIdArray[i],
        name[i],
        proxy
      );
      if (response.status === 200) {
        return response;
      } else {
        if (!token) {
          toastWarning(tokenMsg);
        } else {
          toastWarning(response.response.data.message);
        }
        return null;
      }
    }
  } else if (type === "passwordChanger") {
    let pass = newPass;
    if (!pass) {
      pass = generateRandomPassword({
        lower: true,
        upper: true,
        num: true,
        sym: true,
        length: 18,
      });
    }
    const response = await passwordChangerAPI(token, password, pass, proxy);
    if (response.status === 200) {
      return response;
    } else {
      if (!token) {
        toastWarning(tokenMsg);
      } else {
        if (!password) {
          toastWarning(passMsg);
        } else {
          toastWarning(response.response.data.message);
        }
      }
      return null;
    }
  } else if (type === "tokenChecker") {
    const response = await tokenCheckerAPI(token, proxy);
    if (response.status === 200) {
      return response;
    } else {
      if (!token) {
        toastWarning(tokenMsg);
      } else {
        toastWarning(response.response.data.message);
      }
      return null;
    }
  } else if (type === "massInviter") {
    const inviteCodeList = invideCodes?.split("\n");
    for (let i = 0; i < inviteCodeList.length; i++) {
      let code = inviteCodeList[i];
      const response = await directDiscordJoinAPI(
        proxy,
        code,
        token,
        settingObj
      );
      if (response?.status === 200) {
        return response;
      } else {
        if (!token) {
          toastWarning(tokenMsg);
        } else {
          toastWarning(response.message);
        }
        return null;
      }
    }
  } else if (type === "tokenRetrieve") {
    const response = await tokenChanger(email, password, proxy);
    if (response.status === 200) {
      return response;
    } else {
      if (!email) {
        toastWarning(emailMsg);
      } else {
        if (!password) {
          toastWarning(passMsg);
        } else {
          toastWarning(response.response.data.message);
        }
      }
      return null;
    }
  } else if (type === "xpFarmer") {
    if (status) {
      const res = await callApis(
        proxy,
        channelID,
        settingObj.monitorToken,
        delay
      );
      return res;
    } else return null;
  }
};

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
    // status = false;
  }
  return null;
};
