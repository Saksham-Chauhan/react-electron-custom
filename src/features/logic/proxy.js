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
