import {
  appendClaimerDiscordAccount,
  appendDiscordAccount,
  fetchClaimerDiscordAccountList,
  fetchDiscordAccountList,
  fetchLOSettingState,
  fetchSelectedClaimerTokenInviteJoiner,
  fetchSelectedMinitorTokenLinkOpener,
  setIJLOSetting,
  setSelectedClaimerTokenIJ,
  setSelectedMonitorTokenLO,
} from "../counterSlice";
import { generateId } from "../../helper";

export const addDiscordAccountInList = (account) => (dispatch, getState) => {
  const currentAccountList = fetchDiscordAccountList(getState());
  const tempAccount = { ...account };
  tempAccount["id"] = generateId();
  const combiner = [tempAccount, ...currentAccountList];
  dispatch(appendDiscordAccount(combiner));
};

export const editDiscordAccountInList =
  (editedAccount) => (dispatch, getState) => {
    const currentAccountList = fetchDiscordAccountList(getState());
    const inviteJoinerToken = fetchSelectedClaimerTokenInviteJoiner(getState());
    const linkOpenerToken = fetchSelectedMinitorTokenLinkOpener(getState());
    const tempAccount = { ...editedAccount };
    const afterUpdate = [...currentAccountList].map((account) => {
      if (account["id"] === tempAccount["id"]) return tempAccount;
      return account;
    });
    if (Object.keys(linkOpenerToken).length > 0) {
      dispatch(setSelectedMonitorTokenLO(tempAccount));
    }
    if (Object.keys(inviteJoinerToken).length > 0) {
      dispatch(setSelectedClaimerTokenIJ(tempAccount));
    }
    dispatch(appendDiscordAccount(afterUpdate));
  };

export const deleteAccountFromList =
  (deleteAccount) => (dispatch, getState) => {
    const currentAccountList = fetchDiscordAccountList(getState());
    const afterDelete = [...currentAccountList].filter(
      (account) => account["id"] !== deleteAccount["id"]
    );
    dispatch(appendDiscordAccount(afterDelete));
    dispatch(setSelectedMonitorTokenLO({}));
  };

export const addClaimerAccountInList = (account) => (dispatch, getState) => {
  const currentAccountList = fetchClaimerDiscordAccountList(getState());
  const newAccount = { ...account };
  newAccount["id"] = generateId();
  const combiner = [newAccount, ...currentAccountList];
  dispatch(appendClaimerDiscordAccount(combiner));
};

export const deleteClaimerAccountFromList =
  (account) => (dispatch, getState) => {
    const currentAccountList = fetchClaimerDiscordAccountList(getState());
    const afterFilter = [...currentAccountList].filter(
      (acc) => acc["id"] !== account["id"]
    );
    dispatch(appendClaimerDiscordAccount(afterFilter));
  };

export const editClaimerAccountFromList = (account) => (dispatch, getState) => {
  const currentAccountList = fetchClaimerDiscordAccountList(getState());
  const afterUpdate = [...currentAccountList].map((data) => {
    if (data["id"] === account["id"]) return account;
    return data;
  });
  dispatch(appendClaimerDiscordAccount(afterUpdate));
};

export const linkOpenerSettingHandler = (data) => (dispatch, getState) => {
  const settingState = fetchLOSettingState(getState());
  const settingObj = { ...settingState };
  const { key, checked, value } = data;
  if (key === "TOGGLER_STATE") {
    settingObj["linkOpenerState"] = checked;
  } else if (key === "CHROME_USER") {
    settingObj["selectedChromeUser"] = value;
  } else if (key === "SOUND") {
    settingObj["playSound"] = checked;
  } else if (key === "IGNORE_TWITTER_LINK") {
    settingObj["ignoreTwitterLink"] = checked;
  } else {
    settingObj["ignoreDiscordInviteLink"] = checked;
  }
  dispatch(setIJLOSetting({ key: "linkOpener", value: settingObj }));
};
