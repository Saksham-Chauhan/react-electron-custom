import {
  appendApInList,
  appendDataInTwitterList,
  fetchAPIlistState,
  fetchFeatureTweetList,
  fetchLatestTweetList,
  fetchTwitterKeywordList,
  fetchTwitterSettingState,
  fetchTwitterUserList,
  setTweetsInFeeder,
  setTwitterSetting,
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
    obj["label"] = obj["value"];
    let combiner = [obj, ...tempCurrentList];
    dispatch(
      appendDataInTwitterList({ key: "twitterUserNameList", data: combiner })
    );
  } else {
    const currentList = fetchTwitterKeywordList(getState());
    let tempCurrentList = [...currentList];
    let obj = {};
    obj["id"] = generateId();
    obj["value"] = word;
    obj["label"] = obj["value"];
    let combiner = [obj, ...tempCurrentList];
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

export const appendNewTweetInList = (data) => (dispatch, getState) => {
  const { key, tweet } = data;
  if (key === "LATEST") {
    const latestTweet = fetchLatestTweetList(getState());
    let combiner = { ...latestTweet };
    combiner[tweet["tweet_id"]] = tweet;
    dispatch(setTweetsInFeeder({ key, list: combiner }));
  } else {
    const featureTweetList = fetchFeatureTweetList(getState());
    let combiner = { ...featureTweetList };
    combiner[tweet["tweet_id"]] = tweet;
    dispatch(setTweetsInFeeder({ key, list: combiner }));
  }
};

export const addNewApiInList = (apiObj) => (dispatch, getState) => {
  const currentApiList = fetchAPIlistState(getState());
  let obj = { ...apiObj };
  obj["id"] = generateId();
  let combiner = [obj, ...currentApiList];
  dispatch(appendApInList(combiner));
};

export const removeApiFromList = (api) => (dispatch, getState) => {
  const currentApiList = fetchAPIlistState(getState());
  let afterFilter = currentApiList.filter((a) => a["id"] !== api["id"]);
  dispatch(appendApInList(afterFilter));
};

export const resetTwitterMonitor = () => (dispatch, getState) => {
  const currentSetting = fetchTwitterSettingState(getState());
  let tempSetting = { ...currentSetting };
  tempSetting["twitterMonitor"] = false;
  tempSetting["startAutoInviteJoiner"] = false;
  tempSetting["startAutoLinkOpener"] = false;
  dispatch(setTwitterSetting(tempSetting));
};
