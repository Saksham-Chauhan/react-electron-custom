import { STATE_KEY } from "../constant";
import { createSlice } from "@reduxjs/toolkit";
import { ProxyState } from "./initial-state/proxy";
import { discordAccount } from "./initial-state/discordAccount";
import { twitterInitialState } from "./initial-state/twitter";
import { spoofInitialState } from "./initial-state/spoof";
import { settingInitialState } from "./initial-state/setting";
import { initialUserState } from "./initial-state/user-initial-state";
import { DashboardState } from "./initial-state/dashboard";
import { inviteJoinerInitialState } from "./initial-state/invite-joiner";
import { AccChangerInitialState } from "./initial-state/acc-changer";
const initialState = {
  tempStorage: {},
  editStorage: {},
  ...ProxyState,
  ...discordAccount,
  ...twitterInitialState,
  ...spoofInitialState,
  ...settingInitialState,
  ...initialUserState,
  ...DashboardState,
  ...inviteJoinerInitialState,
  ...AccChangerInitialState,
  modals: {
    proxyGroup: false,
    discordAccount: false,
    addGmail: false,
    inviteJoinerAccount: false,
    inviteJoinerSetting: false,
    spoofModal: false,
    editProxy: false,
    claimerGroup: false,
    dashboardModal: false,
    accountChangerModal: false,
  },
};

export const counterSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {
    updatespooferArray: (state, action) => {
      state.spoofArr = [...action.payload];
    },
    updateTwiterArray: (state, action) => {
      state.tweetsArr = [...action.payload];
    },
    updateLinkOpnerArray: (state, action) => {
      state.linkOpnerArr = [...action.payload];
    },
    updateInviteJoinerArray: (state, action) => {
      state.inviteJoinerArr = [...action.payload];
    },
    appendProxyGroupInList: (state, action) => {
      state.proxyGroupList = action.payload;
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
      state.discordAccountList = action.payload;
    },
    setSelectedMonitorTokenLO: (state, action) => {
      state.selectedMonitorTokenLO = action.payload;
    },
    appendLogList: (state, action) => {
      const { key, list } = action.payload;
      state[key].logList = list;
    },
    clearLogList: (state, action) => {
      const { key } = action.payload;
      state[key].logList = [];
    },
    setLOchromeUser: (state, action) => {
      state.linkOpener.selectedChromeUser = action.payload;
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
    appendClaimerDiscordAccount: (state, action) => {
      state.claimerAccountList = action.payload;
    },
    setIJLOSetting: (state, action) => {
      const { key, value } = action.payload;
      state.setting[key] = value;
    },
    appendDataInTwitterList: (state, action) => {
      const { key, data } = action.payload;
      state[key] = data;
    },
    setTwitterSetting: (state, action) => {
      state.twitterSetting = action.payload;
    },
    setTweetsInFeeder: (state, action) => {
      const { key, list } = action.payload;
      if (key === "LATEST") {
        state.latesTweetlist = list;
      } else {
        state.featureTweetList = list;
      }
    },
    clearTweetsFeeder: (state, action) => {
      const key = action.payload;
      if (key === "LATEST") {
        state.latesTweetlist = {};
      } else {
        state.featureTweetList = {};
      }
    },
    appendApInList: (state, action) => {
      state.twitterApiList = action.payload;
    },
    setTwitterChromeUser: (state, action) => {
      state.twitterSelectedChromeUser = action.payload;
    },
    setTwitterClaimerGroup: (state, action) => {
      state.twitterSelectedClaimerGroup = action.payload;
    },
    incrementApiRotater: (state) => {
      const { twitterApiList, apiRotaterIndex } = state;
      if (apiRotaterIndex < twitterApiList.length) {
        state.apiRotaterIndex += 1;
      } else {
        state.apiRotaterIndex -= 1;
      }
    },
    appendSpooferInList: (state, action) => {
      state.spoofTabe = action.payload;
    },
    appendClaimerGroupInList: (state, action) => {
      state.claimerAccountList = action.payload;
    },
    appendChromeUserInList: (state, action) => {
      state.chromeUserList = action.payload;
    },
    setWebhookSetting: (state, action) => {
      state.webhookSetting = action.payload;
    },
    appendWebhookInList: (state, action) => {
      state.webhookSetting.webhookList = [action.payload];
    },
    openAddNewProxyModal: (state, action) => {
      state.addProxyStorage = action.payload;
    },
    setUserDetails: (state, action) => {
      state.isUserLoggedIn = !state.isUserLoggedIn;
      state.userDetails = action.payload;
    },
    resetUserLoggedState: (state, action) => {
      state.isUserLoggedIn = false;
    },
    appendInviteJoinerAccount: (state, action) => {
      state.inviteJoinerAccount = action.payload;
    },
    // INVITE JOINER
    toggleIJMonitor: (state) => {
      state.isInviteJoinerStart = !state.isInviteJoinerStart;
    },
    resetIJMonitor: (state) => {
      state.isInviteJoinerStart = false;
    },
    setIsIJmodal: (state) => {
      state.isInviteJoinerModal = !state.isInviteJoinerModal;
    },
    setInviteProxyGroup: (state, action) => {
      state.selectedInviteProxyGroup = action.payload;
    },
    setInviteJoinerDelay: (state, action) => {
      state.safeModedelay = action.payload;
    },
    setSelectedClaimerGroup: (state, action) => {
      state.selectedInviteClaimerGroup = action.payload;
    },
    setSelctedAccChangerCard: (state, action) => {
      state.selectedAccChangerType = action.payload;
    },
    setAccountChangerList: (state, action) => {
      state.accountOptionList = action.payload;
    },
  },
});

export const {
  updatespooferArray,
  updateTwiterArray,
  updateInviteJoinerArray,
  updateLinkOpnerArray,
  appendApInList,
  resetUserLoggedState,
  resetIJMonitor,
  setInviteProxyGroup,
  setInviteJoinerDelay,
  setSelectedClaimerGroup,
  toggleIJMonitor,
  setUserDetails,
  setIsIJmodal,
  clearLogList,
  appendLogList,
  setModalState,
  setIJLOSetting,
  setTempStorage,
  setEditStorage,
  setLOchromeUser,
  setTweetsInFeeder,
  clearTweetsFeeder,
  setTwitterSetting,
  setWebhookSetting,
  appendSpooferInList,
  incrementApiRotater,
  appendWebhookInList,
  openAddNewProxyModal,
  setTwitterChromeUser,
  appendDiscordAccount,
  appendProxyGroupInList,
  setTwitterClaimerGroup,
  appendChromeUserInList,
  appendDataInTwitterList,
  appendClaimerGroupInList,
  appendChannelInArrayList,
  appendKeywordInArrayList,
  setSelectedMonitorTokenLO,
  setSelectedClaimerTokenIJ,
  appendClaimerDiscordAccount,
  appendInviteJoinerAccount,
  setSelctedAccChangerCard,
  setAccountChangerList,
} = counterSlice.actions;

export default counterSlice.reducer;

export const fetchTempStorageState = (state) => state[STATE_KEY].tempStorage;
export const fetchEditStorageState = (state) => state[STATE_KEY].editStorage;

// PROXY SELECTOR
export const fetchProxyGroupList = (state) => state[STATE_KEY].proxyGroupList;
export const fetchProxyGroupModalState = (state) =>
  state[STATE_KEY].modals.proxyGroup;
export const fetchEditProxyModalState = (state) =>
  state[STATE_KEY].modals.editProxy;
export const fetchIsAddnewProxyModalState = (state) =>
  state[STATE_KEY].addProxyStorage;

// LINK OPNER SELECTOR
export const fetchDiscordModalState = (state) =>
  state[STATE_KEY].modals.discordAccount;
export const fetchDiscordAccountList = (state) =>
  state[STATE_KEY].discordAccountList;
export const fetchSelectedMinitorTokenLinkOpener = (state) =>
  state[STATE_KEY].selectedMonitorTokenLO;
export const fetchLOKeywordList = (state) =>
  state[STATE_KEY].linkOpener.keyWordList;
export const fetchLOChannelList = (state) =>
  state[STATE_KEY].linkOpener.channelList;
export const fetchLOSettingState = (state) =>
  state[STATE_KEY].setting.linkOpener;
export const fetchLinkOpenerLogState = (state) =>
  state[STATE_KEY].linkOpener.logList;
export const fetchLOchromeUserState = (state) =>
  state[STATE_KEY].linkOpener.selectedChromeUser;

// ADD GMAIL
export const fetchAddGmailModalState = (state) =>
  state[STATE_KEY].modals.addGmail;

// invite joiner
export const fetchClaimerDiscordAccountList = (state) =>
  state[STATE_KEY].claimerAccountList;
export const fetchSelectedClaimerTokenInviteJoiner = (state) =>
  state[STATE_KEY].selectedClaimerTokenIJ;
export const fetchIJKeywordList = (state) =>
  state[STATE_KEY].inviteJoiner.keyWordList;

export const fetchAddJoinerModalState = (state) =>
  state[STATE_KEY].modals.inviteJoinerAccount;

export const fetchIJSettingState = (state) =>
  state[STATE_KEY].setting.inviteJoiner;
export const fetchIJChannelList = (state) =>
  state[STATE_KEY].inviteJoiner.channelList;
export const fetchInviteJoinerSettingModalState = (state) =>
  state[STATE_KEY].modals.inviteJoinerSetting;
export const fetchIJMonitorState = (state) =>
  state[STATE_KEY].isInviteJoinerStart;
export const fetchIsInviteJoinerModalState = (state) =>
  state[STATE_KEY].isInviteJoinerModal;
export const fetchInviteJoinerLogState = (state) =>
  state[STATE_KEY].inviteJoiner.logList;
export const fetchSelctedInviteProxyGroup = (state) =>
  state[STATE_KEY].selectedInviteProxyGroup;
export const fetchSafeModeDelayState = (state) =>
  state[STATE_KEY].safeModedelay;
export const fetchSelectedClaimerGroupState = (state) =>
  state[STATE_KEY].selectedInviteClaimerGroup;

// TWITTER
export const fetchTwitterKeywordList = (state) =>
  state[STATE_KEY].twitterKeywordList;
export const fetchTwitterUserList = (state) =>
  state[STATE_KEY].twitterUserNameList;
export const fetchTwitterSettingState = (state) =>
  state[STATE_KEY].twitterSetting;
export const fetchLatestTweetList = (state) => state[STATE_KEY].latesTweetlist;
export const fetchFeatureTweetList = (state) =>
  state[STATE_KEY].featureTweetList;
export const fetchAPIlistState = (state) => state[STATE_KEY].twitterApiList;
export const fetchApiRotaterIndex = (state) => state[STATE_KEY].apiRotaterIndex;
export const fetchTwitterChromeUserState = (state) =>
  state[STATE_KEY].twitterSelectedChromeUser;
export const fetchTwitterClaimerGroupState = (state) =>
  state[STATE_KEY].twitterSelectedClaimerGroup;

// SPOOF
export const fetchSpoofModalState = (state) =>
  state[STATE_KEY].modals.spoofModal;
export const fetchSpoofTableList = (state) => state[STATE_KEY].spoofTabe;

// SETTING
export const fetchClaimerGroupModalState = (state) =>
  state[STATE_KEY].modals.claimerGroup;
export const fetchClaimerGroupList = (state) =>
  state[STATE_KEY].claimerAccountList;
export const fetchChromeUserListState = (state) =>
  state[STATE_KEY].chromeUserList;
export const fetchWebhookSettingState = (state) =>
  state[STATE_KEY].webhookSetting;
export const fetchWebhookListState = (state) =>
  state[STATE_KEY].webhookSetting.webhookList;

// LOGIN
export const fetchLoggedUserDetails = (state) => state[STATE_KEY].userDetails;
export const fetchUserLoggedInState = (state) =>
  state[STATE_KEY].isUserLoggedIn;

//DASHBOARD
export const fetchDashboardModalState = (state) =>
  state[STATE_KEY].modals.dashboardModal;

// FOR DASHBOARD CHART
export const fetchLinkOpnerArray = (state) => state[STATE_KEY].linkOpnerArr;
export const fetchInviteJoinerArray = (state) =>
  state[STATE_KEY].inviteJoinerArr;
export const fetchTwiterArray = (state) => state[STATE_KEY].tweetsArr;
export const fetchSpooferArray = (state) => state[STATE_KEY].spoofArr;

// INVITE JOINER;
export const fetchInviteJoinerListState = (state) =>
  state[STATE_KEY].inviteJoinerAccount;

// ACC CHNAGER
export const fetchAccountChangerModalState = (state) =>
  state[STATE_KEY].modals.accountChangerModal;
export const fetchSelectedAccChangerCard = (state) =>
  state[STATE_KEY].selectedAccChangerType;
export const fetchAccChangerListState = (state) =>
  state[STATE_KEY].accountOptionList;

// fetchTweets,
// updateTweetsArray,
// updateSpoofArray,
// updateLinkArray,
// updateInviteArray,
