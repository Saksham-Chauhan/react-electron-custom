import {
  appendDataInTwitterList,
  fetchTwitterKeywordList,
  fetchTwitterUserList,
} from "../counterSlice";
import { generateId } from "../../helper";

export const addTwitterKeywordInList = (data) => (dispatch, getState) => {
  const { key, word } = data;
  if (key === "USER") {
    const currentList = fetchTwitterUserList(getState());
    let tempCurrentList = [...currentList];
    let obj = {};
    obj["id"] = generateId();
    obj["value"] = word;
    obj["label"] = word;
    let combiner = [...tempCurrentList, obj];
    dispatch(
      appendDataInTwitterList({ key: "twitterUserNameList", data: combiner })
    );
  } else {
    const currentList = fetchTwitterKeywordList(getState());
    let tempCurrentList = [...currentList];
    let obj = {};
    obj["id"] = generateId();
    obj["value"] = word;
    obj["label"] = word;
    let combiner = [...tempCurrentList, obj];
    dispatch(
      appendDataInTwitterList({ key: "twitterKeywordList", data: combiner })
    );
  }
};

export const deleteTwitterDatafromList = (data) => (dispatch, getState) => {
  const { key, word } = data;
  if (key === "USER") {
    const currentList = fetchTwitterUserList(getState());
    let tempCurrentList = [...currentList];
    let afterFilter = tempCurrentList.filter((data) => data.id !== word.id);
    dispatch(
      appendDataInTwitterList({ key: "twitterUserNameList", data: afterFilter })
    );
  } else {
    const currentList = fetchTwitterKeywordList(getState());
    let tempCurrentList = [...currentList];
    let afterFilter = tempCurrentList.filter((data) => data.id !== word.id);
    dispatch(
      appendDataInTwitterList({ key: "twitterKeywordList", data: afterFilter })
    );
  }
};
