import { generateId } from "../../helper";
import {
  appendInviteJoinerAccount,
  fetchInviteJoinerListState,
} from "../counterSlice";

export const addNewIJAccount = (account) => (dispatch, getState) => {
  const currentList = fetchInviteJoinerListState(getState());
  let obj = { ...account };
  obj["id"] = generateId();
  let combiner = [obj, ...currentList];
  dispatch(appendInviteJoinerAccount(combiner));
};
