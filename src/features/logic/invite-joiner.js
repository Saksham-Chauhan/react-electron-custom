import { generateId } from "../../helper";
import {
  appendInviteJoinerAccount,
  fetchInviteJoinerListState,
} from "../counterSlice";

export const addNewIJAccount = (account) => (dispatch, getState) => {
  const currentList = fetchInviteJoinerListState(getState());
  const combiner = [{ ...account, id: generateId() }, ...currentList];
  dispatch(appendInviteJoinerAccount(combiner));
};
