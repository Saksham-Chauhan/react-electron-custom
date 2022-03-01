import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  setTwitterSetting,
  fetchTwitterUserList,
  fetchTwitterKeywordList,
  fetchTwitterSettingState,
  fetchLatestTweetList,
  fetchFeatureTweetList,
  setTweetsInFeeder,
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
    const webhook = [];
    const fetchTweets = () => {
      try {
        userList.forEach(async (tweetUser) => {
          if (TweetHandlerRegExp.test(tweetUser["value"])) {
            const newTweets = await getTweets(
              tweetConfig.keys[0].consumer_key,
              tweetConfig.keys[0].consumer_secret,
              tweetUser["value"]
            );
            // here we dispatch newTweets as latest newTweets
            dispatch(setTweetsInFeeder({ key: "LATEST", tweet: newTweets }));
            // after scanning the newTweets we dipatch to feature tweet section
            const filteredTweets = await twitterScanner(
              newTweets,
              keyWordList,
              webhook,
              twitterSetting?.startAutoLinkOpener || false
            );
            // check if tweet is feature tweeets after scanning
            if (filteredTweets.featured_type) {
              dispatch(
                setTweetsInFeeder({ key: "FEATURE", tweet: filteredTweets })
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
          }}
        />
      ) : (
        <TwitterSettingScreen {...{ handleScreen }} />
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
}) => (
  <React.Fragment>
    <TwitterPageTopSection />
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
            />
          </div>
          <div>
            <TwitterPageCardScroll
              list={featureTweetList}
              title="Featured Tweets"
            />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);
