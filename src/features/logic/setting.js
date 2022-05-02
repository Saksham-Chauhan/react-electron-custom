import {
  setWebhookSetting,
  appendWebhookInList,
  fetchClaimerGroupList,
  fetchWebhookListState,
  setTwitterClaimerGroup,
  appendChromeUserInList,
  setSelectedClaimerGroup,
  fetchWebhookSettingState,
  appendClaimerGroupInList,
  fetchChromeUserListState,
  fetchTwitterClaimerGroupState,
  fetchSelectedClaimerGroupState,
  fetchLoggedUserDetails,
} from "../counterSlice";
import { generateId } from "../../helper";
import { sendLogs } from "../../helper/electron-bridge";
import { inviteJoinerTest, linkOpenerWebhook } from "../../helper/webhook";

export const addGroupInClaimerList = (group) => (dispatch, getState) => {
  const currentList = fetchClaimerGroupList(getState());
  let obj = { ...group };
  obj["id"] = generateId();
  let combiner = [obj, ...currentList];
  dispatch(appendClaimerGroupInList(combiner));
};

export const editClaimerGroupFromList = (group) => (dispatch, getState) => {
  const currentList = fetchClaimerGroupList(getState());
  let tempList = [...currentList];
  let obj = { ...group };
  let afterEdit = tempList.map((d) => {
    if (d["id"] === obj["id"]) return obj;
    return d;
  });
  dispatch(appendClaimerGroupInList(afterEdit));
};

export const deleteClaimerGroupFromList = (group) => (dispatch, getState) => {
  const currentList = fetchClaimerGroupList(getState());
  const ijSelectedClaimer = fetchSelectedClaimerGroupState(getState());
  const twitterSelectedChrome = fetchTwitterClaimerGroupState(getState());
  let tempList = [...currentList];
  let obj = { ...group };
  let afterEdit = tempList.filter((d) => d["id"] !== obj["id"]);

  if (ijSelectedClaimer["id"] === obj["id"]) {
    dispatch(setSelectedClaimerGroup({}));
  }
  if (twitterSelectedChrome["id"] === obj["id"]) {
    dispatch(setTwitterClaimerGroup({}));
  }
  dispatch(appendClaimerGroupInList(afterEdit));
};

export const addChromeUserInList = (user) => (dispatch, getState) => {
  const currentList = fetchChromeUserListState(getState());
  let obj = {};
  obj["value"] = user;
  obj["label"] = user;
  obj["id"] = generateId();
  let combiner = [obj, ...currentList];
  dispatch(appendChromeUserInList(combiner));
};

export const removeChromeUserFromList = (user) => (dispatch, getState) => {
  const currentList = fetchChromeUserListState(getState());
  let tempList = [...currentList];
  let afterEdit = tempList.filter((d) => d["id"] !== user["id"]);
  dispatch(appendChromeUserInList(afterEdit));
};

export const toggleSettingSwitch = (toggle) => (dispatch, getState) => {
  const settingState = fetchWebhookSettingState(getState());
  let tempSettingObj = { ...settingState };
  const { key, checked } = toggle;
  if (key === "LO") {
    tempSettingObj["linkOpener"] = checked;
  } else if (key === "IJ") {
    tempSettingObj["inviteJoiner"] = checked;
  } else if (key === "TWITTER") {
    tempSettingObj["twitterMonitor"] = checked;
  } else if (key === "LOG") {
    tempSettingObj["logOnOff"] = checked;
  } else {
    tempSettingObj["bgAnimation"] = checked;
  }
  dispatch(setWebhookSetting(tempSettingObj));
};

export const addWebhookInList = (webhook) => (dispatch, getState) => {
  const currentList = fetchWebhookListState(getState());
  let obj = {};
  obj["webhook"] = webhook;
  obj["id"] = generateId();
  let combiner = [obj, ...currentList];
  dispatch(appendWebhookInList(combiner));
};

export const readTokenGroupFromFile = (data) => (dispatch, getState) => {
  const { name, tokenArr } = data;
  let valid = [];
  const currentList = fetchClaimerGroupList(getState());
  let tokenList = [...tokenArr.split("\n")];
  for (let i = 0; i < tokenList.length; i++) {
    const token = tokenList[i];
    let len = token.split(":").length;
    if (len === 3) {
      valid.push(token);
    }
  }
  let obj = {};
  obj["id"] = generateId();
  obj["name"] = name;
  obj["claimerList"] = [];
  obj["claimerToken"] = valid.map((tkn) => tkn).join("\n");
  obj["createdAt"] = new Date().toUTCString();
  const log = `New Discord Account is created ${obj["name"]}`;
  sendLogs(log);
  let combiner = [obj, ...currentList];
  dispatch(appendClaimerGroupInList(combiner));
};

export const webhookNotifier = (payload) => async (dispatch, getState) => {
  const { status, type } = payload;
  const setting = fetchWebhookSettingState(getState());
  const user = fetchLoggedUserDetails(getState());
  const webhookList = fetchWebhookListState(getState());
  if (webhookList.length > 0) {
    if (type === "IJ") {
      await inviteJoinerTest(
        webhookList[0],
        user.username,
        user.avatar,
        status,
        setting?.inviteJoiner
      );
    } else {
      await linkOpenerWebhook(
        status,
        user.username,
        user.avatar,
        webhookList[0],
        setting?.linkOpener
      );
    }
  }
};
