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

export const basicAccChangerValidation = (obj) => {
  let valid = false;
  if (Object.keys(obj.proxyGroup).length > 0) {
    valid = true;
  } else {
    toastWarning("Select proxy group");
    valid = false;
  }
  if (Object.keys(obj.claimerGroup).length > 0) {
    valid = true;
  } else {
    valid = false;
    toastWarning("Select Token group");
  }
  return valid;
};
