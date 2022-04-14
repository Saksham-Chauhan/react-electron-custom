import React from "react";
import "./styles.css";
import Chance from "chance";
import { useDispatch } from "react-redux";
import {
  updateStatusOfTableRow,
  deleteDataFromTableList,
  updatePasswordChangerStatus,
} from "../../../features/logic/acc-changer";
import TableRow from "../table-row/TableRow";
import { toastWarning } from "../../../toaster";
import { generateRandomAvatar, getProxy } from "../../../api";
import { generateRandomPassword, sleep } from "../../../helper";
import {
  readArrayOfJson,
  startInviteJoinerMonitor,
  startLinkOpenerMonitor,
  stopInviteJoinerMonitor,
  stopLinkOpenerMonitor,
} from "../../../helper/electron-bridge";
import serverLeaverAPI from "../../../api/account-changer/leave-server";
import tokenCheckerAPI from "../../../api/account-changer/token-checker";
import avatarChangeAPI from "../../../api/account-changer/avatar-changer";
import massInviteJoinerAPI from "../../../api/account-changer/mass-joiner";
import usernameChangerAPI from "../../../api/account-changer/username-changer";
import activityChangerAPI from "../../../api/account-changer/activity-changer";
import nicknameChangerAPI from "../../../api/account-changer/nickname-changer";
import passwordChangerAPI from "../../../api/account-changer/password-changer";

function TableSection({ list }) {
  const dispatch = useDispatch();

  const handleDelete = (obj) => {
    dispatch(deleteDataFromTableList(obj));
  };

  const handlePlay = async (obj) => {
    const type = obj["changerType"];
    const { proxyGroup, claimerGroup } = obj;
    const tokenArray = claimerGroup["value"]?.split("\n");
    if (type === "linkOpener") {
      startLinkOpenerMonitor(obj);
    } else if (type === "inviteJoiner") {
      startInviteJoinerMonitor(obj);
    } else {
      for (let index = 0; index < tokenArray.length; index++) {
        const token = tokenArray[index];
        const tokenArr = token?.split(":");
        const proxyArray = proxyGroup["value"].split("\n");
        for (let j = 0; j < proxyArray.length; j++) {
          const proxy = getProxy(proxyArray);
          dispatch(updateStatusOfTableRow(obj, "Running"));
          const apiResponse = await apiCallToDiscord({
            type,
            token: tokenArr[3],
            proxy,
            username: obj.username,
            password: tokenArr[2],
            guildId: obj.serverIDs,
            activityDetail: obj.activityDetails,
            nickName: obj.nicknameGenerate,
            currentPass: tokenArr[2],
            newPass: obj.commonPassword,
            invideCodes: obj.inviteCodes,
            avatarAPI: obj.url,
          });
          if (apiResponse !== null) {
            if (apiResponse.status === 200) {
              let tempObj = { ...obj };
              let arr = [];
              let user = [];
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
              } else {
                dispatch(updateStatusOfTableRow(tempObj, "Completed"));
              }
              break;
            }
          } else {
            dispatch(updateStatusOfTableRow(obj, "Stopped"));
          }
          await sleep(Number(obj.delay) || 3000);
        }
      }
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
  };

  const handleStop = (obj) => {
    const type = obj["changerType"];
    if (type === "linkOpener") {
      stopLinkOpenerMonitor(obj.id);
    } else if (type === "inviteJoiner") {
      stopInviteJoinerMonitor(obj.id);
    }
  };

  return (
    <div className="acc-changer-page-table-section">
      <div className="acc-chnager-table-header-parent">
        <div className="acc-chnager-page-table-header">
          <div>#</div>
          <div>Type</div>
          <div>Token Group</div>
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
  currentPass,
  newPass,
  username,
  invideCodes,
  avatarAPI,
}) => {
  if (type === "avatarChanger") {
    let response;
    let randomImage;
    if (avatarAPI === "customAPI") {
      randomImage = await generateRandomAvatar(avatarAPI);
    } else {
      randomImage = await generateRandomAvatar();
    }
    response = await avatarChangeAPI(token, randomImage, proxy);
    if (response.status === 200) {
      return response;
    } else {
      toastWarning(response.response.data.message);
      return null;
    }
  } else if (type === "serverLeaver") {
    let serverIdArray = guildId.split("\n");
    for (let i = 0; i < serverIdArray.length; i++) {
      const response = await serverLeaverAPI(token, serverIdArray[i], proxy);
      if (response.status === 200 || response.status === 204) {
        return response;
      } else {
        toastWarning(response.response.data.message);
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
      toastWarning(response.response.data.message);
      return null;
    }
  } else if (type === "activityChanger") {
    const response = await activityChangerAPI(token, activityDetail, proxy);
    if (response.status === 200) {
      return response;
    } else {
      toastWarning(response.response.data.message);
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
        toastWarning(response.response.data.message);
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
    const response = await passwordChangerAPI(token, currentPass, pass, proxy);
    if (response.status === 200) {
      return response;
    } else {
      toastWarning(response.response.data.message);
      return null;
    }
  } else if (type === "tokenChecker") {
    const response = await tokenCheckerAPI(token, proxy);
    if (response.status === 200) {
      return response;
    } else {
      toastWarning(response.response.data.message);
      return null;
    }
  } else if (type === "massInviter") {
    const inviteCodeList = invideCodes?.split("\n");
    for (let i = 0; i < inviteCodeList.length; i++) {
      let code = inviteCodeList[i];
      const response = await massInviteJoinerAPI(code, token, proxy);

      if (response.status === 200) {
        return response;
      } else {
        toastWarning(response.response.data.message);
        return null;
      }
    }
  }
};
