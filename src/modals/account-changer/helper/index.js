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
  if (obj.inviteCodes.length > 0) {
    return true;
  } else {
    toastWarning("Enter Invite code ");
    return false;
  }
};
export const nicknameChangerValidation = (obj) => {
  if (obj.serverIDs.length > 0) {
    return true;
  } else {
    toastWarning("Enter Server IDs");
    return false;
  }
};

export const userNameChangerValidation = (obj) => {
  if (obj.username.length > 0) {
    return true;
  } else {
    toastWarning("Enter Invite code ");
    return false;
  }
};

export const inviteJoinerValidation = (obj) => {
  let valid = false;
  if (Object.keys(obj?.monitorToken || {}).length > 0) {
    valid = true;
  } else {
    toastWarning("Select Monitor token");
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
    toastWarning("Select Monitor token");
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
  if (obj?.keywords?.length > 0) {
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
      toastWarning("Select Token group");
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
      tempObj["label"] = tokenList[j].split(":")[3];
      tempObj["value"] = tokenList[j];
      arr.push(tempObj);
    }
    obj["options"] = arr;
    groupArray.push(obj);
  }
  return groupArray;
};
