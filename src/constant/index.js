const KYRO_DOCS_URL = "https://guide.kyrotools.in/#/";

export const STATE_KEY = "kyro-tools";
export const MIN_SAFE_DELAY_VALUE = 0;
export const MAX_SAFE_DELAY_VALUE = 10 * 1000;

export const RoutePath = {
  home: "/",
  spoofer: "/spoofer",
  twitter: "/twitter",
  setting: "/settings",
  accountChanger: "/accountchanger",
  ethMinter: "/ethminter",
};

export const DocsEndPoint = {
  "/": KYRO_DOCS_URL + "Dashboard",
  "/ethminter": KYRO_DOCS_URL + "README",
  "/accountchanger": KYRO_DOCS_URL + "README",
  "/spoofer": KYRO_DOCS_URL + "Spoofer",
  "/twitter": KYRO_DOCS_URL + "TwitterMonitor",
  "/settings": KYRO_DOCS_URL + "Settings",
};

export const EndPointToPage = {
  "/": "Dashboard Page",
  "/ethminter": "NFT Minter Page",
  "/accountchanger": "Acc Changer Page",
  "/spoofer": "Spoofer Page",
  "/twitter": "Twitter Page",
  "/settings": "Settings Page",
};

export const DISCORD_MASS_OPTIONS = [
  {
    label: "Username Changer",
    value: "usernameChanger",
  },
  {
    label: "Avatar Changer",
    value: "avatarChanger",
  },
  {
    value: "activityChanger",
    label: "Status Changer",
  },
  {
    value: "serverLeaver",
    label: "Server Leaver",
  },
  {
    value: "tokenChecker",
    label: "Token Checker",
  },
  {
    value: "nicknameChanger",
    label: "Nickname  Changer",
  },
  {
    value: "passwordChanger",
    label: "Password Changer",
  },
  { value: "massInviter", label: "Mass Joiner" },
  { value: "inviteJoiner", label: "Invite Joiner" },
  { value: "linkOpener", label: "Link Opener" },
  { value: "tokenRetrieve", label: "Token Retriever" },
  { value: "giveawayJoiner", label: "Giveaway Joiner" },
  { value: "xpFarmer", label: "XP Farmer" },
  { value: "discordSpoofer", label: "Discord Spoofer" },
];

export const replyList = [
  "lfgooooo",
  "nice",
  "lets do it",
  "lets gooooo",
  "excited",
  "praying🙏",
  "fingers crossed",
  "🤞",
  "🙏",
  "THIS IS MINE!",
];

export const nftOptionsList = [{ label: "ETH", value: "eth" }];

export const defaultChromeUser = { label: "Default", value: "default" };

export const statusList = [
  { label: "Online", value: "online" },
  { label: "Idle", value: "idle" },
  { label: "Invisible", value: "invisible" },
  { label: "Do Not Disturb", value: "dnd" },
];
