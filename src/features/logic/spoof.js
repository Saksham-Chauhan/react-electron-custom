import { generateId } from "../../helper";
import { appendSpooferInList, fetchSpoofTableList } from "../counterSlice";

export const addNewSpooferInList = (spoof) => (dispatch, getState) => {
  const currentList = fetchSpoofTableList(getState());
  let templist = [...currentList];
  let obj = { ...spoof };
  obj["id"] = generateId();
  let combiner = [...templist, obj];
  dispatch(appendSpooferInList(combiner));
};

export const deleteSpooferFromList = (spoof) => (dispatch, getState) => {
  const currentList = fetchSpoofTableList(getState());
  let templist = [...currentList];
  let afterDel = templist.filter((data) => data["id"] !== spoof["id"]);
  dispatch(appendSpooferInList(afterDel));
};
