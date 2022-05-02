import { generateId } from "../../helper";
import { appendSpooferInList, fetchSpoofTableList } from "../counterSlice";

export const addNewSpooferInList = (spoof) => (dispatch, getState) => {
  const currentList = fetchSpoofTableList(getState());
  let templist = [...currentList];
  let obj = { ...spoof };
  obj["id"] = generateId();
  let combiner = [obj, ...templist];
  dispatch(appendSpooferInList(combiner));
};

export const deleteSpooferFromList = (spoof) => (dispatch, getState) => {
  const currentList = fetchSpoofTableList(getState());
  let templist = [...currentList];
  let afterDel = templist.filter((data) => data["id"] !== spoof["id"]);
  dispatch(appendSpooferInList(afterDel));
};

export const updateSpooferStatus = (data) => (dispatch, getState) => {
  const { status, id } = data;
  const currentList = fetchSpoofTableList(getState());
  let templist = [...currentList];
  let afterUpdate = templist.map((data) => {
    if (data["id"] === id) {
      let obj = { ...data };
      obj["status"] = status;
      return obj;
    }
    return data;
  });
  dispatch(appendSpooferInList(afterUpdate));
};

export const resetSpooferStatus = (data) => (dispatch, getState) => {
  const currentList = fetchSpoofTableList(getState());
  let templist = [...currentList];
  let afterUpdate = templist.map((data) => {
    let obj = { ...data };
    obj["status"] = "Idle";
    return obj;
  });
  dispatch(appendSpooferInList(afterUpdate));
};
