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
  let tempCurrentAccount = [...currentAccountList];
  let tempAccount = { ...account };
  tempAccount["id"] = generateId();
  let combiner = [tempAccount, ...tempCurrentAccount];
  dispatch(appendDiscordAccount(combiner));
};

export const editDiscordAccountInList =
  (editedAccount) => (dispatch, getState) => {
    const currentAccountList = fetchDiscordAccountList(getState());
    const inviteJoinerToken = fetchSelectedClaimerTokenInviteJoiner(getState());
    const linkOpenerToken = fetchSelectedMinitorTokenLinkOpener(getState());
    let tempCurrentAccount = [...currentAccountList];
    let tempAccount = { ...editedAccount };
    let afterUpdate = tempCurrentAccount.map((account) => {
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
    let tempCurrentAccount = [...currentAccountList];
    let tempAccount = { ...deleteAccount };
    let afterDelete = tempCurrentAccount.filter(
      (account) => account["id"] !== tempAccount["id"]
    );
    dispatch(appendDiscordAccount(afterDelete));
    dispatch(setSelectedMonitorTokenLO({}));
  };

export const addClaimerAccountInList = (account) => (dispatch, getState) => {
  const currentAccountList = fetchClaimerDiscordAccountList(getState());
  let tempCurrentAccount = [...currentAccountList];
  let newAccount = { ...account };
  newAccount["id"] = generateId();
  let combiner = [newAccount, ...tempCurrentAccount];
  dispatch(appendClaimerDiscordAccount(combiner));
};

export const deleteClaimerAccountFromList =
  (account) => (dispatch, getState) => {
    const currentAccountList = fetchClaimerDiscordAccountList(getState());
    let tempCurrentAccount = [...currentAccountList];
    let afterFilter = tempCurrentAccount.filter(
      (acc) => acc["id"] !== account["id"]
    );
    dispatch(appendClaimerDiscordAccount(afterFilter));
  };

export const editClaimerAccountFromList = (account) => (dispatch, getState) => {
  const currentAccountList = fetchClaimerDiscordAccountList(getState());
  let tempCurrentAccount = [...currentAccountList];
  let afterUpdate = tempCurrentAccount.map((data) => {
    if (data["id"] === account["id"]) return account;
    return data;
  });
  dispatch(appendClaimerDiscordAccount(afterUpdate));
};

export const linkOpenerSettingHandler = (data) => (dispatch, getState) => {
  const settingState = fetchLOSettingState(getState());
  let settingObj = { ...settingState };
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
