import { v4 as uuid } from "uuid";
export const makeStrOfArr = (arrOfObj) => arrOfObj.map((data) => data["value"]);

export const isValueInUse = (arrOfObj, key, firstValue) => {
  let isValid = false;
  for (let i = 0; i < arrOfObj.length; i++) {
    if (arrOfObj[i][key] === firstValue[key]) {
      isValid = true;
      break;
    }
  }
  return isValid;
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
  } ${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] - ${msg}-id${generateId()}`;
};

export const generateId = () => uuid();

export const downloadLogs = (content, title) => {
  // let data;
  let tempData = {};
  if (title === "token") {
    for (let i = 0; i < content.length; i++) {
      tempData[content[i].name] = [...content[i].claimerToken.split("\n")];
    }
  } else if (title === "proxie") {
    for (let i = 0; i < content.length; i++) {
      tempData[content[i].groupName] = [
        ...content[i].proxyList.map((item) => item.proxy),
      ];
    }
  } else {
    // data = content.map((v) => v["proxy"]).join("\n");
  }
  const fileName = `${title}s`;
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(tempData, null, 4)], {
    type: "application/json",
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const makeClaimerSelectOption = (list) => {
  if (list.length > 0) {
    return list.map((d) => {
      return { label: d["name"], id: d["id"], value: d["claimerToken"] };
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

/**
 * function make option for select
 */
export const makeProxyOptions = (proxyGroupList = []) => {
  let arr = [];
  if (proxyGroupList.length > 0) {
    for (let i = 0; i < proxyGroupList.length; i++) {
      if (proxyGroupList[i]["proxyList"].length > 0) {
        let obj = {};
        obj["label"] = proxyGroupList[i]["groupName"];
        obj["value"] = proxyGroupList[i]["proxies"];
        obj["id"] = proxyGroupList[i]["id"];
        arr.push(obj);
      }
    }
    return arr;
  } else return [];
};

export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
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
  let uint8 = new Uint8Array(buffer);
  if (encoding === "base64") {
    str = String.fromCharCode.apply(null, uint8);
    return btoa(str);
  }
  var decoder = new TextDecoder(encoding);
  str = decoder.decode(uint8);
  return str;
};

export default function prependHttp(url, { https = true } = {}) {
  if (typeof url !== "string") {
    throw new TypeError(
      `Expected \`url\` to be of type \`string\`, got \`${typeof url}\``
    );
  }

  url = url.trim();

  if (/^\.*\/|^(?!localhost)\w+?:/.test(url)) {
    return url;
  }

  return url.replace(/^(?!(?:\w+?:)?\/\/)/, https ? "https://" : "http://");
}

export const getEncryptedToken = (token) => {
  return token.slice(0, 4) + "#### ####" + token.slice(-6);
};
