import {
  appendChannelInArrayList,
  appendClaimerDiscordAccount,
  appendDiscordAccount,
  appendKeywordInArrayList,
  appendLogList,
  fetchClaimerDiscordAccountList,
  fetchDiscordAccountList,
  fetchIJChannelList,
  fetchInviteJoinerLogState,
  fetchLinkOpenerLogState,
  fetchLOChannelList,
  fetchLOKeywordList,
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
  let combiner = [...tempCurrentAccount, tempAccount];
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

export const addKeywordInList = (data) => (dispatch, getState) => {
  const { key, word } = data;
  if (key === "LO") {
    const currentList = fetchLOKeywordList(getState());
    let tempCurrentList = [...currentList];
    let obj = {};
    obj["id"] = generateId();
    obj["label"] = word;
    obj["value"] = word;
    let combiner = [...tempCurrentList, obj];
    dispatch(appendKeywordInArrayList({ list: combiner, key: "linkOpener" }));
  }
};

export const deleteKeywordFromList = (data) => (dispatch, getState) => {
  const { key, word } = data;
  if (key === "LO") {
    const currentList = fetchLOKeywordList(getState());
    let tempCurrentList = [...currentList];
    let filter = tempCurrentList.filter((data) => data.id !== word.id);
    dispatch(appendKeywordInArrayList({ list: filter, key: "linkOpener" }));
  }
};

export const addChannelInList = (data) => (dispatch, getState) => {
  const { key, word } = data;
  if (key === "LO") {
    const currentList = fetchLOChannelList(getState());
    let tempCurrentList = [...currentList];
    let obj = {};
    obj["id"] = generateId();
    obj["label"] = word;
    obj["value"] = word;
    let combiner = [...tempCurrentList, obj];
    dispatch(appendChannelInArrayList({ list: combiner, key: "linkOpener" }));
  } else {
    const currentList = fetchIJChannelList(getState());
    let tempCurrentList = [...currentList];
    let obj = {};
    obj["id"] = generateId();
    obj["label"] = word;
    obj["value"] = word;
    let combiner = [...tempCurrentList, obj];
    dispatch(appendChannelInArrayList({ list: combiner, key: "inviteJoiner" }));
  }
};

export const deleteChannelFromList = (data) => (dispatch, getState) => {
  const { key, word } = data;
  if (key === "LO") {
    const currentList = fetchLOChannelList(getState());
    let tempCurrentList = [...currentList];
    let filter = tempCurrentList.filter((data) => data.id !== word.id);
    dispatch(appendChannelInArrayList({ list: filter, key: "linkOpener" }));
  } else {
    const currentList = fetchIJChannelList(getState());
    let tempCurrentList = [...currentList];
    let filter = tempCurrentList.filter((data) => data.id !== word.id);
    dispatch(appendChannelInArrayList({ list: filter, key: "inviteJoiner" }));
  }
};

export const addClaimerAccountInList = (account) => (dispatch, getState) => {
  const currentAccountList = fetchClaimerDiscordAccountList(getState());
  let tempCurrentAccount = [...currentAccountList];
  let newAccount = { ...account };
  newAccount["id"] = generateId();
  let combiner = [...tempCurrentAccount, newAccount];
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

export const addLogInList = (data) => (dispatch, getState) => {
  const { key, log, id } = data;
  if (key === "LO") {
    const logList = fetchLinkOpenerLogState(getState());
    let combiner = { ...logList };
    combiner[id] = log;
    dispatch(appendLogList({ key: "linkOpener", list: combiner }));
  } else {
    const logList = fetchInviteJoinerLogState(getState());
    let combiner = { ...logList };
    combiner[id] = log;
    dispatch(appendLogList({ key: "inviteJoiner", list: combiner }));
  }
};

export const closelinkOpenerMonitor = () => (dispatch, getState) => {
  const settingState = fetchLOSettingState(getState());
  let settingObj = { ...settingState };
  settingObj["linkOpenerState"] = false;
  dispatch(setIJLOSetting({ key: "linkOpener", value: settingObj }));
};
