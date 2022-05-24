import { generateId } from "../../helper";
import { appendSpooferInList, fetchSpoofTableList } from "../counterSlice";

export const addNewSpooferInList = (spoof) => (dispatch, getState) => {
  const currentList = fetchSpoofTableList(getState());
  const combiner = [{ ...spoof, id: generateId() }, ...currentList];
  dispatch(appendSpooferInList(combiner));
};

export const deleteSpooferFromList = (spoof) => (dispatch, getState) => {
  const currentList = fetchSpoofTableList(getState());
  const afterDel = [...currentList].filter(
    (data) => data["id"] !== spoof["id"]
  );
  dispatch(appendSpooferInList(afterDel));
};

export const updateSpooferStatus = (data) => (dispatch, getState) => {
  const { status, id } = data;
  const currentList = fetchSpoofTableList(getState());
  const afterUpdate = [...currentList].map((data) => {
    if (data["id"] === id) return { ...data, status };
    return data;
  });
  dispatch(appendSpooferInList(afterUpdate));
};

export const resetSpooferStatus = () => (dispatch, getState) => {
  const currentList = fetchSpoofTableList(getState());
  const afterUpdate = [...currentList].map((data) => {
    return { ...data, status: "Idle" };
  });
  dispatch(appendSpooferInList(afterUpdate));
};
