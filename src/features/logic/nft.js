import { generateId } from "../../helper";
import {
  appendGroupInNftList,
  fetchActiveNftGroupState,
  fetchNftGroupListState,
  fetchNftWalletListState,
  setActiveNftGroup,
  setNftWalletList,
} from "../counterSlice";

export const appendGroupInNftGroupList = (group) => (dispatch, getState) => {
  const groupList = fetchNftGroupListState(getState());
  dispatch(
    appendGroupInNftList([{ ...group, id: generateId() }, ...groupList])
  );
};

export const appendNftWalletInList = (wallet) => (dispatch, getState) => {
  const walletList = fetchNftWalletListState(getState());
  dispatch(setNftWalletList([{ ...wallet, id: generateId() }, ...walletList]));
};

export const editNftWalletList = (wallet) => (dispatch, getState) => {
  const walletList = fetchNftWalletListState(getState());
  let updatedList = walletList.filter((item) => {
    if (item.id === wallet.id) return wallet;
    else return item;
  });
  dispatch(setNftWalletList(updatedList));
};

export const removeNftWalletFromList = (data) => (dispatch, getState) => {
  const walletList = fetchNftWalletListState(getState());
  dispatch(
    setNftWalletList(walletList.filter((wallet) => wallet.id !== data.id))
  );
};

export const addTaskInGroup = (task) => (dispatch, getState) => {
  const groupList = fetchNftGroupListState(getState());
  const activeNftGroup = fetchActiveNftGroupState(getState());
  const newTask = {
    ...activeNftGroup,
    minterList: [{ ...task, id: generateId() }, ...activeNftGroup.minterList],
  };
  dispatch(setActiveNftGroup(newTask));
  dispatch(
    appendGroupInNftList(
      groupList.map((d) => {
        if (d["id"] === newTask["id"]) return newTask;
        return d;
      })
    )
  );
};

export const removeTaskFromList = (task) => (dispatch, getState) => {
  const groupList = fetchNftGroupListState(getState());
  const activeNftGroup = fetchActiveNftGroupState(getState());
  const newTask = {
    ...activeNftGroup,
    minterList: [...activeNftGroup.minterList].filter((d) => d.id !== task.id),
  };
  dispatch(setActiveNftGroup(newTask));
  dispatch(
    appendGroupInNftList(
      groupList.map((d) => {
        if (d["id"] === task["id"]) return newTask;
        return d;
      })
    )
  );
};

export const deleteMinterGroup = (group) => (dispatch, getState) => {
  const groupList = fetchNftGroupListState(getState());
  const activeNftGroup = fetchActiveNftGroupState(getState());
  dispatch(setActiveNftGroup({}));
  dispatch(
    appendGroupInNftList(
      groupList.filter((group) => group["id"] !== activeNftGroup["id"])
    )
  );
};

export const editTaskInGroup = (task) => (dispatch, getState) => {
  const groupList = fetchNftGroupListState(getState());
  const activeNftGroup = fetchActiveNftGroupState(getState());
  const newTask = {
    ...activeNftGroup,
    minterList: [...activeNftGroup.minterList].map((data) => {
      if (data.id === task.id) return task;
      return data;
    }),
  };
  dispatch(setActiveNftGroup(newTask));
  dispatch(
    appendGroupInNftList(
      groupList.map((d) => {
        if (d["id"] === newTask["id"]) return newTask;
        return d;
      })
    )
  );
};
