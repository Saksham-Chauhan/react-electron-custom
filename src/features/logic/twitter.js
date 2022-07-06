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
    const obj = {};
    obj["id"] = generateId();
    obj["value"] = word;
    obj["label"] = obj["value"];
    dispatch(
      appendDataInTwitterList({
        key: "twitterUserNameList",
        data: [obj, ...currentList],
      })
    );
  } else {
    const currentList = fetchTwitterKeywordList(getState());
    const obj = {};
    obj["id"] = generateId();
    obj["value"] = word;
    obj["label"] = obj["value"];
    dispatch(
      appendDataInTwitterList({
        key: "twitterKeywordList",
        data: [obj, ...currentList],
      })
    );
  }
};

export const deleteTwitterDatafromList = (data) => (dispatch, getState) => {
  const { key, word } = data;
  if (key === "USER") {
    const currentList = fetchTwitterUserList(getState());
    const afterFilter = [...currentList].filter((data) => data.id !== word.id);
    dispatch(
      appendDataInTwitterList({ key: "twitterUserNameList", data: afterFilter })
    );
  } else {
    const currentList = fetchTwitterKeywordList(getState());
    const afterFilter = [...currentList].filter((data) => data.id !== word.id);
    dispatch(
      appendDataInTwitterList({ key: "twitterKeywordList", data: afterFilter })
    );
  }
};

export const appendNewTweetInList = (data) => (dispatch, getState) => {
  const { key, tweet } = data;
  if (key === "LATEST") {
    const latestTweet = fetchLatestTweetList(getState());
    const combiner = { ...latestTweet };
    combiner[tweet["tweet_id"]] = tweet;
    dispatch(setTweetsInFeeder({ key, list: combiner }));
  } else {
    const featureTweetList = fetchFeatureTweetList(getState());
    const combiner = { ...featureTweetList };
    combiner[tweet["tweet_id"]] = tweet;
    dispatch(setTweetsInFeeder({ key, list: combiner }));
  }
};

export const addNewApiInList = (apiObj) => (dispatch, getState) => {
  const currentApiList = fetchAPIlistState(getState());
  dispatch(
    appendApInList([{ ...apiObj, id: generateId() }, ...currentApiList])
  );
};

export const removeApiFromList = (api) => (dispatch, getState) => {
  const currentApiList = fetchAPIlistState(getState());
  const afterFilter = currentApiList.filter((a) => a["id"] !== api["id"]);
  dispatch(appendApInList(afterFilter));
};

export const resetTwitterMonitor = () => (dispatch, getState) => {
  const currentSetting = fetchTwitterSettingState(getState());
  dispatch(
    setTwitterSetting({
      ...currentSetting,
      twitterMonitor: false,
      startAutoInviteJoiner: false,
      startAutoLinkOpener: false,
    })
  );
};
