import { createSlice } from "@reduxjs/toolkit";
import { STATE_KEY } from "../constant";
import { ProxyState } from "./initial-state/proxy";
import { discordAccount } from "./initial-state/discordAccount";
const initialState = {
  tempStorage: {},
  editStorage: {},
  ...ProxyState,
  ...discordAccount,
  modals: {
    proxyGroup: false,
    discordAccount: false,
  },
};

export const counterSlice = createSlice({
  name: STATE_KEY,
  initialState,

  reducers: {
    appendProxyGroupInList: (state, action) => {
      state.proxyGroup = action.payload;
    },
    setModalState: (state, action) => {
      const key = action.payload;
      state.modals[key] = !state.modals[key];
    },
    setTempStorage: (state, action) => {
      state.tempStorage = action.payload;
    },
    setEditStorage: (state, action) => {
      state.editStorage = action.payload;
    },
    appendDiscordAccount: (state, action) => {
      state.discordAccount = action.payload;
    },
    setSelectedMonitorTokenLO: (state, action) => {
      state.selectedMonitorTokenLO = action.payload;
    },
    setSelectedClaimerTokenIJ: (state, action) => {
      state.selectedClaimerTokenIJ = action.payload;
    },
    appendKeywordInArrayList: (state, action) => {
      const { key, list } = action.payload;
      state[key].keyWordList = list;
    },
    appendChannelInArrayList: (state, action) => {
      const { key, list } = action.payload;
      state[key].channelList = list;
    },
  },
});

export const {
  appendProxyGroupInList,
  setModalState,
  setTempStorage,
  appendDiscordAccount,
  setEditStorage,
  setSelectedMonitorTokenLO,
  appendKeywordInArrayList,
  appendChannelInArrayList,
} = counterSlice.actions;

export default counterSlice.reducer;
export const fetchTempStorageState = (state) => state[STATE_KEY].tempStorage;
export const fetchEditStorageState = (state) => state[STATE_KEY].editStorage;
// PROXY SELECTOR
export const fetchProxyGroupList = (state) => state[STATE_KEY].proxyGroup;
export const fetchProxyGroupModalState = (state) =>
  state[STATE_KEY].modals.proxyGroup;

// LINK OPNER SELECTOR
export const fetchDiscordModalState = (state) =>
  state[STATE_KEY].modals.discordAccount;
export const fetchDiscordAccountList = (state) =>
  state[STATE_KEY].discordAccount;
export const fetchSelectedMinitorTokenLinkOpener = (state) =>
  state[STATE_KEY].selectedMonitorTokenLO;
export const fetchSelectedClaimerTokenInviteJoiner = (state) =>
  state[STATE_KEY].selectedClaimerTokenIJ;
export const fetchIJKeywordList = (state) =>
  state[STATE_KEY].inviteJoiner.keyWordList;
export const fetchLOKeywordList = (state) =>
  state[STATE_KEY].linkOpener.keyWordList;

export const fetchIJChannelList = (state) =>
  state[STATE_KEY].inviteJoiner.channelList;
export const fetchLOChannelList = (state) =>
  state[STATE_KEY].linkOpener.channelList;
