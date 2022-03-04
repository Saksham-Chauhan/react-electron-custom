import { v4 as uuid } from "uuid";

export const makeStrOfArr = (arrOfObj) => arrOfObj.map((data) => data["value"]);

export const isValueInUse = (arrOfObj, key, targetValue) => {
  let valid = false;
  for (let i = 0; i < arrOfObj.length; i++) {
    if (arrOfObj[i][key] === targetValue) {
      valid = true;
      break;
    }
  }
  return valid;
};

export const makeLogText = (msg) => {
  const d = new Date();
  return `${d.toDateString()}:${d.toLocaleTimeString()} - ${msg}`;
};

export const generateId = () => uuid();

const downloadLogs = (content) => {
  let data = content.map((v) => v).join("\n");
  const d = new Date();
  const fileName = `${d.getMonth()}-${d.getDay()}-${d.getFullYear()}:${d.toLocaleTimeString()}`;
  const a = document.createElement("a");
  const file = new Blob([data], { type: "text/plain" });
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
};

export const handleExportLogs = (logs) => downloadLogs(logs);
