import { generateId } from "../../helper";
import {
  appendInviteJoinerAccount,
  fetchInviteJoinerListState,
} from "../counterSlice";

export const addNewIJAccount = (account) => (dispatch, getState) => {
  const currentList = fetchInviteJoinerListState(getState());
  const obj = { ...account };
  obj["id"] = generateId();
  const combiner = [obj, ...currentList];
  dispatch(appendInviteJoinerAccount(combiner));
};
