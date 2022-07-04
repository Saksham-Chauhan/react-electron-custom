import axios from "axios";
import { BASE_URL } from "../../../api";
import { toastWarning } from "../../../toaster";

export const activityChangerValidation = (obj) => {
  if (obj.activityDetails.length > 0) {
    return true;
  } else {
    toastWarning("Enter activity detail");
    return false;
  }
};

export const massInviteJoinerValidation = (obj) => {
  let flag = false;
  if (!obj.inviteCodes) {
    toastWarning("Enter Invite code ");
    return false;
  }
  if (obj?.isReact) {
    flag = reactValidation(obj);
    if (!flag) return flag;
  }
  if (obj?.isAcceptRule) {
    flag = acceptValidation(obj);
    if (!flag) return flag;
  }
  return true;
};

const reactValidation = (obj) => {
  if (!obj?.channelId || !obj?.messageId || !obj?.emojiValue) {
    if (!obj?.channelId) {
      toastWarning("Enter channel ID");
    }
    if (!obj?.messageId) toastWarning("Enter message ID");
    if (!obj?.emojiValue) toastWarning("Enter emoji");
    return false;
  } else return true;
};
const acceptValidation = (obj) => {
  if (!obj?.rules) {
    toastWarning("Enter accept format rule");
    return false;
  } else return true;
};
export const nicknameChangerValidation = (obj) => {
  if (obj?.serverIDs) {
    return true;
  } else {
    toastWarning("Enter Server IDs");
    return false;
  }
};

export const userNameChangerValidation = (obj) => {
  let flag = true;
  const credentials = obj.claimerGroup.value.split("\n");
  for (let i = 0; i < credentials.length; i++) {
    const tokenArray = credentials[i].split(":");
    if (tokenArray[1] && tokenArray[2]) {
      flag = false;
      toastWarning(
        tokenArray[2]
          ? "Invalid format password is required"
          : "Invalid format token is required"
      );
    }
  }
  if (obj.username.length <= 0) {
    flag = false;
  }
  if (flag) {
    return true;
  }
  // else {
  //   toastWarning("Enter Invite code ");
  //   return false;
  // }
};

export const giveawayJoinerValidation = (obj) => {
  const { botid, serverid, token } = obj;
  if (botid && serverid && token) {
    return true;
  } else {
    let message;
    if (!botid) message = "Enter bot id";
    if (!serverid) message = "Enter server id";
    if (!token) message = "Select token";
    toastWarning(message);
    return false;
  }
};

export const inviteJoinerValidation = (obj) => {
  let valid = false;
  if (Object.keys(obj?.monitorToken || {})?.length > 0) {
    valid = true;
  } else {
    toastWarning("Enter Monitor token");
    valid = false;
    return valid;
  }
  if (obj?.channelIDs?.length > 0) {
    valid = true;
  } else {
    toastWarning("Enter channel ID");
    valid = false;
    return valid;
  }
  return valid;
};
export const serverLeaverValidation = (obj) => {
  let valid = false;
  if (obj.serverIDs) {
    return true;
  } else toastWarning("Enter server ID");
  return valid;
};

export const linkOpenerValidation = (obj) => {
  let valid;
  if (Object.keys(obj?.chromeUser || {}).length > 0) {
    valid = true;
  } else {
    toastWarning("Select Chrome user");
    valid = false;
    return valid;
  }
  if (Object.keys(obj?.monitorToken || {}).length > 0) {
    valid = true;
  } else {
    toastWarning("Enter Monitor token");
    valid = false;
    return valid;
  }
  if (obj?.channelIDs?.length > 0) {
    valid = true;
  } else {
    toastWarning("Enter channel ID");
    valid = false;
    return valid;
  }
  if (Object.keys(obj?.keywords).length > 0) {
    valid = true;
  } else {
    toastWarning("Enter keyword");
    valid = false;
    return valid;
  }

  return valid;
};

export const basicAccChangerValidation = (obj) => {
  let valid = false;
  if (obj.changerType.length > 0) {
    valid = true;
  } else {
    toastWarning("Select Type");
    valid = false;
  }
  if (obj.changerType !== "linkOpener") {
    if (Object.keys(obj.claimerGroup).length > 0) {
      valid = true;
    } else {
      valid = false;
      toastWarning("Select Discord Accounts");
      return valid;
    }
    if (Object.keys(obj.proxyGroup).length > 0) {
      valid = true;
    } else {
      toastWarning("Select proxy group");
      valid = false;
      return valid;
    }
  }

  return valid;
};

export const makeGroupOptions = (list = []) => {
  let groupArray = [];
  for (let i = 0; i < list.length; i++) {
    let obj = {};
    let arr = [];
    const group = list[i];
    const tokenList = [...group["claimerToken"].split("\n")];
    obj["label"] = group["name"];
    for (let j = 0; j < tokenList.length; j++) {
      let tempObj = {};
      tempObj["label"] = tokenList[j].split(":")[2];
      tempObj["value"] = tokenList[j];
      arr.push(tempObj);
    }
    obj["options"] = arr;
    groupArray.push(obj);
  }
  return groupArray;
};

export const getAllChannelIds = async (id, token) => {
  try {
    const res = await axios.get(`${BASE_URL}guilds/${id}/channels`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
