import Fuse from "fuse.js";

const PageListSearchPattern = {
  HARVESTER: [
    "email",
    "score",
    "password",
    "proxy",
    "status",
    "recoveryEmail",
    "securityAnswer",
  ],
  ACCOUNTGEN: ["site", "proxy", "amount", "mobile", "profile"],
  PROXY: ["status", "proxy"],
  SPOOF: [
    "url",
    "status",
    "quantity",
    "proxyName",
    "proxyValue",
    "disableImages",
    "isDisableImage",
  ],
  ACC_GEN: ["status", "claimerGroup.label", "proxyGroup.label", "changerType"],
  NFT_WALLET: [
    "walletNickName",
    "walletPrivateKey",
    "walletPublicKey",
    "walletBalance",
  ],
  NFT_MINTER: [
    "transactionCost",
    "contractAddress",
    "functionName",
    "functionParam",
    "gasPriceMethod",
    "status",
    "walletName",
  ],
};

/**
 * function that search in array of objects
 * @param {String} searchText
 * @param {Array} searchInList
 * @param {String} searchKey
 * @returns  An array of search results
 */
export const searchingFunction = (
  searchText = "",
  searchInList = [],
  searchKey = "HARVESTER"
) => {
  const fuse = new Fuse(searchInList, {
    keys: PageListSearchPattern[searchKey],
    isCaseSensitive: false,
  });
  return fuse.search(searchText).map((search) => search["item"]);
};
