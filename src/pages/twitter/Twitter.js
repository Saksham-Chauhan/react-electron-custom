import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  setTwitterSetting,
  fetchTwitterUserList,
  fetchTwitterKeywordList,
  fetchTwitterSettingState,
  fetchLatestTweetList,
  fetchFeatureTweetList,
  clearTweetsFeeder,
} from "../../features/counterSlice";
import {
  TwitterTopLeftSection,
  TwitterPageTopSection,
  TwitterPageCardScroll,
  TwitterUserListSection,
  TwitterKeywordListSection,
} from "../../pages-component";
import { AppSpacer } from "../../component";
import tweetConfig from "../../config/twitter";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "../../helper/electron-bridge";
import { TweetHandlerRegExp } from "../../constant/regex";
import TwitterSettingScreen from "./sub-screen/SettingScreen";
import twitterScanner from "./utils/feature-tweets/scanner";
import { appendNewTweetInList } from "../../features/logic/twitter";
import tweetHelper from "./utils/feature-tweets/helper";

const TWEET_FETCH_TIME = 5 * 1000;

function Twitter() {
  const dispatch = useDispatch();
  const userList = useSelector(fetchTwitterUserList);
  const [settingPage, setSettingPage] = useState(false);
  const keyWordList = useSelector(fetchTwitterKeywordList);
  const latestTweetList = useSelector(fetchLatestTweetList);
  const featureTweetList = useSelector(fetchFeatureTweetList);
  const twitterSetting = useSelector(fetchTwitterSettingState);

  useEffect(() => {
    let timer = null;
    const webhook =
      "https://discord.com/api/webhooks/948212028475060244/uyvDxt2Fxk0CKh8X5haF4t6MG0y-db2999iesTuVD8EBg55E6u4v-ffv7L0C2yPy96rA";
    const fetchTweets = () => {
      try {
        userList.forEach(async (tweetUser) => {
          if (TweetHandlerRegExp.test(tweetUser["value"])) {
            const newTweets = await getTweets(
              tweetConfig.keys[0].consumer_key,
              tweetConfig.keys[0].consumer_secret,
              tweetUser["value"]
            );
            dispatch(
              appendNewTweetInList({
                key: "LATEST",
                tweet: tweetHelper.extractDataFromTweet(newTweets),
              })
            );
            const filteredTweets = await twitterScanner(
              newTweets,
              keyWordList,
              webhook,
              twitterSetting?.startAutoLinkOpener || false
            );
            if (filteredTweets.featured_type) {
              console.log(filteredTweets);
              dispatch(
                appendNewTweetInList({ key: "FEATURE", tweet: filteredTweets })
              );
            }
          }
        });
      } catch (error) {
        console.log("Error in fetching tweets", error);
      }
    };
    if (twitterSetting?.twitterMonitor) {
      timer = setInterval(fetchTweets, TWEET_FETCH_TIME);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [userList, keyWordList, twitterSetting, dispatch]);

  const handleToggle = (event) => {
    let prevState = { ...twitterSetting };
    const { name, checked } = event.target;
    prevState[name] = checked;
    dispatch(setTwitterSetting(prevState));
  };

  const handleScreen = () => {
    setSettingPage(!settingPage);
  };

  const handleDeleteAllTweets = (key) => {
    if (key === "LATEST") {
      dispatch(clearTweetsFeeder(key));
    } else {
      dispatch(clearTweetsFeeder(key));
    }
  };

  return (
    <div className="twitter-page-outer">
      {!settingPage ? (
        <DefaultTwitterScreen
          {...{
            keyWordList,
            userList,
            handleScreen,
            handleToggle,
            twitterSetting,
            latestTweetList,
            featureTweetList,
            handleDeleteAllTweets,
          }}
        />
      ) : (
        <TwitterSettingScreen {...{ handleScreen, latestTweetList }} />
      )}
    </div>
  );
}

export default Twitter;

const DefaultTwitterScreen = ({
  keyWordList,
  userList,
  handleScreen,
  twitterSetting,
  handleToggle,
  latestTweetList,
  featureTweetList,
  handleDeleteAllTweets,
}) => (
  <React.Fragment>
    <TwitterPageTopSection
      subText={`${Object.keys(latestTweetList).length || 0} tweets`}
    />
    <AppSpacer spacer={20} />
    <div className="twitter-page-section">
      <div className="twitter-page-left-section">
        <TwitterTopLeftSection
          {...{ handleScreen, twitterSetting, handleToggle }}
        />
        <div className="twitter-flex-list-row">
          <TwitterKeywordListSection {...{ keyWordList }} />
          <TwitterUserListSection {...{ userList }} />
        </div>
      </div>
      <div className="twitter-page-right-section">
        <div className="twitter-page-card-scroll-flex">
          <div>
            <TwitterPageCardScroll
              list={latestTweetList}
              title="Latest Tweets"
              onClearTweets={() => handleDeleteAllTweets("LATEST")}
            />
          </div>
          <div>
            <TwitterPageCardScroll
              isFeatureTweet={true}
              list={featureTweetList}
              twitterSetting={twitterSetting}
              title="Featured Tweets"
              onClearTweets={() => handleDeleteAllTweets("FEATURE")}
            />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);
