import { ProxyRegExp } from "../../constant/regex";
import { generateId } from "../../helper";
import {
  appendProxyGroupInList,
  fetchProxyGroupList,
  setTempStorage,
} from "../counterSlice";

export const addProxyInList = (group) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  let tempList = [...currentList];
  let after = tempList.map((d) => {
    if (d["id"] === group["id"]) return group;
    return d;
  });
  dispatch(setTempStorage(group));
  dispatch(appendProxyGroupInList(after));
};

export const deleteProxyGroup = (group) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  let tempGroupList = [...currentList];
  let updateGroup = tempGroupList.filter((data) => data["id"] !== group["id"]);
  dispatch(appendProxyGroupInList(updateGroup));
};

export const addProxyGroupInList = (group) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  let combiner = [group, ...currentList];
  dispatch(appendProxyGroupInList(combiner));
};

export const editProxyGroup = (group) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const afterUpdate = [...currentList].map((data) => {
    if (data["id"] === group["id"]) return group;
    return data;
  });
  dispatch(setTempStorage(group));
  dispatch(appendProxyGroupInList(afterUpdate));
};

export const readProxyFromFile = (data) => (dispatch, getState) => {
  const { name, tokenArr } = data;
  const currentList = fetchProxyGroupList(getState());
  const valid = [];
  const obj = {};
  obj["id"] = generateId();
  obj["groupName"] = name;
  obj["proxies"] = tokenArr;
  obj["createdAt"] = new Date().toUTCString();
  const proxyList = [...obj["proxies"].split("\n")];
  for (let i = 0; i < proxyList.length; i++) {
    const len = proxyList[i]?.split(":")?.length;
    if (ProxyRegExp.test(proxyList[i]) || len === 2) {
      const tempObj = {};
      tempObj["id"] = generateId();
      tempObj["proxy"] = proxyList[i];
      tempObj["checked"] = false;
      tempObj["status"] = "N/A";
      valid.push(tempObj);
    }
  }
  obj["proxyList"] = valid;
  dispatch(appendProxyGroupInList([obj, ...currentList]));
};
