export const STATE_KEY = "kyro-tools";

export const MIN_SAFE_DELAY_VALUE = 0;
export const MAX_SAFE_DELAY_VALUE = 10 * 1000;

export const RoutePath = {
  home: "/",
  oneclick: "/oneclick",
  profile: "/profile",
  proxy: "/proxy",
  accountGen: "/accountGen",
  linkOpener: "/linkOpener",
  inviteJoiner: "/inviteJoiner",
  spoofer: "/spoofer",
  twitter: "/twitter",
  setting: "/settings",
  accountChanger: "/accountchanger",
};
const KYRO_DOCS_URL = "https://guide.kyrotools.in/#/";

export const DocsEndPoint = {
  "/": KYRO_DOCS_URL + "Dashboard",
  "/oneclick": KYRO_DOCS_URL + "README",
  "/accountchanger": KYRO_DOCS_URL + "README",
  "/proxy": KYRO_DOCS_URL + "ProxyGroup",
  "/accountGen": KYRO_DOCS_URL + "README",
  "/linkOpener": KYRO_DOCS_URL + "LinkOpener",
  "/inviteJoiner": KYRO_DOCS_URL + "InviteJoiner",
  "/spoofer": KYRO_DOCS_URL + "Spoofer",
  "/twitter": KYRO_DOCS_URL + "TwitterMonitor",
  "/settings": KYRO_DOCS_URL + "Settings",
};

export const EndPointToPage = {
  "/": "Dashboard Page",
  "/oneclick": "NFT Minter Page",
  "/accountchanger": "Acc Changer Page",
  "/proxy": "Proxy Page",
  "/accountGen": "Acc Gen Page",
  "/linkOpener": "LinkOpener Page",
  "/inviteJoiner": "InviteJoiner Page",
  "/spoofer": "Spoofer Page",
  "/twitter": "Twitter Page",
  "/settings": "Settings Page",
};
