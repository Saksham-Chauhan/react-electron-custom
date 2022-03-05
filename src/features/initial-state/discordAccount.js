export const discordAccount = {
  discordAccountList: [],
  claimerAccountList: [],
  selectedMonitorTokenLO: {},
  selectedClaimerTokenIJ: {},
  linkOpener: {
    keyWordList: [],
    channelList: [],
    logList: [],
    selectedChromeUser: {},
  },
  inviteJoiner: {
    keyWordList: [],
    channelList: [],
    logList: [],
  },
  setting: {
    linkOpener: {
      linkOpenerState: false,
      selectedChromeUser: "",
      playSound: false,
      ignoreTwitterLink: false,
      ignoreDiscordInviteLink: false,
    },
    inviteJoiner: {
      inviteCode: "",
      isReact: false,
      reactSetting: {
        channelId: "",
        messageId: "",
        emojiHexValue: "",
      },
      isAcceptRule: false,
      acceptRule: {
        acceptRuleValue: "",
      },
    },
  },
};
