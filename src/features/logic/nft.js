import { generateId } from "../../helper";
import {
  appendGroupInNftList,
  fetchNftGroupListState,
  fetchNftWalletListState,
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
  dispatch(setNftWalletList([{ ...wallet, id: generateId(), ...walletList }]));
};

export const removeNftWalletFromList = (data) => (dispatch, getState) => {
  const walletList = fetchNftWalletListState(getState());
  dispatch(
    setNftWalletList(walletList.filter((wallet) => wallet.id !== data.id))
  );
};
