import {
  appendProxyGroupInList,
  fetchProxyGroupList,
  fetchTempStorageState,
  setTempStorage,
} from "../counterSlice";

export const addProxyGroupInList = (group) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  let combiner = [...currentList, group];
  dispatch(appendProxyGroupInList(combiner));
};

export const deleteProxyRow = (data) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const currentSelectedGroup = fetchTempStorageState(getState());
  let tempGroupList = [...currentList];
  let obj = { ...currentSelectedGroup };
  obj["proxyList"] = obj["proxyList"].filter(
    (proxy) => proxy["id"] !== data["id"]
  );
  obj["proxies"] = obj["proxyList"].map((data) => data["proxy"]).join("\n");
  let updateGroup = tempGroupList.map((data) => {
    if (data["id"] === obj["id"]) return obj;
    return data;
  });
  dispatch(setTempStorage(obj));
  dispatch(appendProxyGroupInList(updateGroup));
};

export const deleteProxyGroup = () => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const currentSelectedGroup = fetchTempStorageState(getState());
  let tempGroupList = [...currentList];
  let updateGroup = tempGroupList.filter(
    (data) => data["id"] !== currentSelectedGroup["id"]
  );
  dispatch(appendProxyGroupInList(updateGroup));
  dispatch(setTempStorage({}));
};

export const editProxyGroup = (group) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  let tempGroupList = [...currentList];
  let editedGroup = { ...group };
  let afterUpdate = tempGroupList.map((data) => {
    if (data["id"] === editedGroup["id"]) return editedGroup;
    return data;
  });
  dispatch(setTempStorage(editedGroup));
  dispatch(appendProxyGroupInList(afterUpdate));
};

export const proxyStatusUpdater = (group) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const currentSelectedGroup = fetchTempStorageState(getState());
  let tempGroupList = [...currentList];
  let tempSelectedObj = { ...currentSelectedGroup };
  let obj = { ...group };
  let afterUpdate = tempSelectedObj["proxyList"].map((data) => {
    if (data["id"] === obj["id"]) {
      let tempObj = { ...data };
      tempObj["status"] = obj["status"];
      return tempObj;
    }
    return data;
  });
  tempSelectedObj["proxyList"] = afterUpdate;
  let afterUpdateGroup = tempGroupList.map((data) => {
    if (data["id"] === tempSelectedObj["id"]) return tempSelectedObj;
    return data;
  });
  dispatch(setTempStorage(tempSelectedObj));
  dispatch(appendProxyGroupInList(afterUpdateGroup));
};

export const removeBadProxy = () => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const currentSelectedGroup = fetchTempStorageState(getState());
  let tempGroupList = [...currentList];
  let tempSelectedObj = { ...currentSelectedGroup };
  tempSelectedObj["proxyList"] = tempSelectedObj["proxyList"].filter(
    (proxy) => proxy["status"] !== "Bad"
  );
  tempSelectedObj["proxies"] = tempSelectedObj["proxyList"]
    .map((proxy) => proxy["proxy"])
    .join("\n");
  let afterUpdateGroup = tempGroupList.map((data) => {
    if (data["id"] === tempSelectedObj["id"]) return tempSelectedObj;
    return data;
  });
  dispatch(setTempStorage(tempSelectedObj));
  dispatch(appendProxyGroupInList(afterUpdateGroup));
};

export const editSingleProxy = (proxy) => (dispatch, getState) => {
  const currentList = fetchProxyGroupList(getState());
  const currentSelectedGroup = fetchTempStorageState(getState());
  let tempGroupList = [...currentList];
  let tempSelectedObj = { ...currentSelectedGroup };
  tempSelectedObj["proxyList"] = tempSelectedObj["proxyList"].map((data) => {
    if (data["id"] === proxy["id"]) return proxy;
    return data;
  });
  tempSelectedObj["proxies"] = tempSelectedObj["proxyList"]
    .map((proxy) => proxy["proxy"])
    .join("\n");
  let afterUpdateGroup = tempGroupList.map((data) => {
    if (data["id"] === tempSelectedObj["id"]) return tempSelectedObj;
    return data;
  });
  dispatch(setTempStorage(tempSelectedObj));
  dispatch(appendProxyGroupInList(afterUpdateGroup));
};

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
