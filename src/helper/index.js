import { v4 as uuid } from "uuid";
const open = window.require("open");

export const makeStrOfArr = (arrOfObj) => arrOfObj.map((data) => data["value"]);

export const isValueInUse = (arrOfObj, key, firstValue) => {
  let valid = false;
  for (let i = 0; i < arrOfObj.length; i++) {
    if (arrOfObj[i][key] === firstValue[key]) {
      valid = true;
      break;
    }
  }
  return valid;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const makeLogText = (msg) => {
  const d = new Date();
  return `[${DAYS[d.getDay()]}, ${d.getDate()} ${
    MONTHS[d.getMonth()]
  } ${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] - ${msg}`;
};

export const generateId = () => uuid();

const downloadLogs = (content, type = "text/plain") => {
  let data;
  if (type === "application/json") {
    data = content;
  } else {
    data = content.map((v) => v).join("\n");
  }
  const d = new Date();
  const fileName = `${d.getMonth()}-${d.getDay()}-${d.getFullYear()}:${d.toLocaleTimeString()}`;
  const a = document.createElement("a");
  const file = new Blob([data], { type });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const makeClaimerSelectOption = (list) => {
  if (list.length > 0) {
    return list.map((d) => {
      let obj = {};
      obj["label"] = d["name"];
      obj["id"] = d["id"];
      obj["value"] = d["claimerToken"];
      return obj;
    });
  } else return [];
};

export const getClaimerValue = (list, obj) => {
  if (Object.keys(obj).length > 0) {
    const result = list.filter((data) => data["id"] === obj["id"]);
    if (result.length > 0) {
      return [
        {
          value: result[0]["claimerToken"],
          label: result[0]["name"],
          id: result[0]["id"],
        },
      ];
    } else return [];
  } else return [];
};

export const handleExportLogs = (logs, type) => downloadLogs(logs, type);

export const tweetTimeToEpoch = (str) => {};

/**
 * function make option for select
 */
export const makeProxyOptions = (proxyGroupList = []) => {
  let arr = [];
  if (proxyGroupList.length > 0) {
    for (let i = 0; i < proxyGroupList.length; i++) {
      let group = proxyGroupList[i];
      if (group["proxyList"].length > 0) {
        let obj = {};
        obj["label"] = group["groupName"];
        obj["value"] = group["proxies"];
        obj["id"] = group["id"];
        arr.push(obj);
      }
    }
    return arr;
  } else return [];
};

export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const generateRandomPassword = ({ lower, upper, num, sym, length }) => {
  const key_strings = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "*;<>()[]{}#$?!^|",
  };

  let MAIN_STRING = "";
  let PASSWORD = "";

  const options = {
    lowercase: lower,
    uppercase: upper,
    number: num,
    symbol: sym,
  };

  for (let i = 0; i < Object.keys(options).length; i++) {
    MAIN_STRING += Object.values(options)[i]
      ? key_strings[Object.keys(options)[i]]
      : "";
  }

  if (MAIN_STRING !== "" && length > 0) {
    for (let i = 0; i < length; i++) {
      PASSWORD += MAIN_STRING[Math.floor(Math.random() * MAIN_STRING.length)];
    }
  }
  return PASSWORD;
};
export const arrayBufferToString = (buffer, encoding) => {
  let str;
  if (encoding == null) encoding = "utf8";
  var uint8 = new Uint8Array(buffer);
  if (encoding === "base64") {
    str = String.fromCharCode.apply(null, uint8);
    return btoa(str);
  }
  var decoder = new TextDecoder(encoding);
  str = decoder.decode(uint8);
  return str;
};
