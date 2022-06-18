import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import {
  TwitterTopLeftSection,
  TwitterPageTopSection,
  TwitterPageCardScroll,
  TwitterUserListSection,
  TwitterKeywordListSection,
} from "../../pages-component";
import {
  fetchThemsState,
  setTwitterSetting,
  clearTweetsFeeder,
  fetchAPIlistState,
  incrementApiRotater,
  fetchTwitterUserList,
  fetchApiRotaterIndex,
  fetchLatestTweetList,
  fetchWebhookListState,
  fetchFeatureTweetList,
  fetchTwitterKeywordList,
  fetchTwitterSettingState,
  fetchWebhookSettingState,
  fetchTwitterClaimerGroupState,
  fetchTwitterChromeUserState,
} from "../../features/counterSlice";
import { AppSpacer } from "../../component";
import { discordServerInviteAPI } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import tweetHelper from "./utils/feature-tweets/helper";
// import { TweetHandlerRegExp } from "../../constant/regex";
import { toastSuccess, toastWarning } from "../../toaster";
import twitterScanner from "./utils/feature-tweets/scanner";
import TwitterSettingScreen from "./sub-screen/SettingScreen";
import { sendLogs } from "../../helper/electron-bridge";
import { appendNewTweetInList } from "../../features/logic/twitter";
import { getEncryptedToken } from "../../helper";
import { setupFrontendListener, emit } from "eiphop";
const electron = window.require("electron");
setupFrontendListener(electron);

const open = window.require("open");

function Twitter() {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const apiList = useSelector(fetchAPIlistState);
  const userList = useSelector(fetchTwitterUserList);
  const [settingPage, setSettingPage] = useState(false);
  const rotaterIndex = useSelector(fetchApiRotaterIndex);
  const webhookList = useSelector(fetchWebhookListState);
  const keyWordList = useSelector(fetchTwitterKeywordList);
  const latestTweetList = useSelector(fetchLatestTweetList);
  const featureTweetList = useSelector(fetchFeatureTweetList);
  const twitterSetting = useSelector(fetchTwitterSettingState);
  const webhookSetting = useSelector(fetchWebhookSettingState);
  const selectedChrome = useSelector(fetchTwitterChromeUserState);
  const selectedClaimer = useSelector(fetchTwitterClaimerGroupState);
  let id = useRef(true);

  const fetchTweets = async (newTweets) => {
    if (newTweets !== undefined && typeof newTweets !== "string") {
      const twitterStart = twitterSetting["monitorStartDate"];
      if (new Date(newTweets["created_at"]) > new Date(twitterStart) || true) {
        dispatch(
          appendNewTweetInList({
            key: "LATEST",
            tweet: tweetHelper.extractDataFromTweet(newTweets),
          })
        );
        let ft;
        if (!("id" in latestTweetList)) {
          ft = await twitterScanner(
            newTweets,
            keyWordList,
            webhookList[0],
            twitterSetting,
            webhookSetting,
            latestTweetList
          );
        }
        if (ft.featured_type) {
          if (
            ft.featured_type === "URLs extracted" &&
            ft.urlsExtracted?.length > 0
          ) {
            dispatch(appendNewTweetInList({ key: "FEATURE", tweet: ft }));
          } else if (ft.featured_type !== "URLs extracted") {
            dispatch(appendNewTweetInList({ key: "FEATURE", tweet: ft }));
          }
          if (
            ft.urlsExtracted?.length > 0 &&
            !(ft["tweet_id"] in latestTweetList)
          ) {
            for (let url of ft.urlsExtracted) {
              let inviteCode = tweetHelper.isDiscordInvite(url);
              if (inviteCode) {
                if (twitterSetting?.startAutoInviteJoiner) {
                  let tokenArray = selectedClaimer["value"].split("\n");
                  tokenArray.forEach(async (token) => {
                    const tkn = token?.split(":")[2]?.substring(0, 4) + "## ##";
                    try {
                      const info = await discordServerInviteAPI(
                        inviteCode,
                        token?.split(":")[2]
                      );
                      if (info.status === 200) {
                        let log = `Successfully Joined ${info.data.guild.name} with ${tkn}`;
                        sendLogs(log);
                        toastSuccess(
                          `Successfully Joined ${info.data.guild.name}`
                        );
                      }
                    } catch (err) {
                      let log = `Error in joininig server ${err.message} with ${tkn}`;
                      sendLogs(log);
                      toastWarning(`Error in joininig server ${err.message}`);
                    }
                  });
                }
              } else {
                if (twitterSetting?.startAutoLinkOpener) {
                  if (Object.keys(selectedChrome).length > 0) {
                    if (selectedChrome) {
                      let log = `Twitter  monitor LO open with ${selectedChrome["value"]} chrome user`;
                      sendLogs(log);
                      await open(url, {
                        app: {
                          name: open.apps.chrome,
                          arguments: [
                            `--profile-directory=${selectedChrome["value"]}`,
                          ],
                        },
                      });
                    }
                  } else {
                    await open(url, {
                      app: {
                        name: open.apps.chrome,
                        arguments: [`--profile-directory=Default`],
                      },
                    });
                  }
                }
              }
            }
          }
        }
      }
    } else {
      const log = `${newTweets} with ${apiList[rotaterIndex]?.apiName}`;
      sendLogs(log);
      dispatch(incrementApiRotater());
    }
  };

  const fetchData = async () => {
    id.current = true;
    for (let i = 0; i < userList.length; i++) {
      const res = await emit(
        "getTweet",
        {
          cKey: apiList[rotaterIndex]?.apiKey,
          sKey: apiList[rotaterIndex]?.apiSecret,
          account: userList[i].value,
        },
        (msg) => {
          console.log(msg);
        }
      );
      if (Object.keys(res.msg).length) {
        fetchTweets(res.msg);
      }
    }
    // await sleep(1);
    if (id.current) {
      fetchData();
    }
  };

  /**
   * function handle start stop switch btn
   **/

  const handleToggle = (event) => {
    let prevState = { ...twitterSetting };
    const { name, checked } = event.target;
    prevState[name] = checked;
    if (name === "twitterMonitor") {
      if (apiList.length > 0) {
        if (userList.length > 0) {
          if (!prevState["twitterMonitor"]) {
            prevState["monitorStartDate"] = "";
          } else {
            prevState["monitorStartDate"] = new Date().toUTCString();
          }
          const maskedKey = apiList[rotaterIndex]?.apiKey.substring(0, 4);
          const maskedSecret = apiList[rotaterIndex]?.apiSecret.substring(0, 4);
          const token = `Api Key ${maskedKey} ## ## & Api secret ${maskedSecret} ## ##`;
          let log = `Twitter  monitor start with ${token}`;
          sendLogs(log);
          if (!twitterSetting?.twitterMonitor) {
            fetchData();
          } else {
            id.current = false;
          }
          if (checked === false) {
            prevState["startAutoInviteJoiner"] = false;
            prevState["startAutoLinkOpener"] = false;
            dispatch(setTwitterSetting(prevState));
          } else {
            dispatch(setTwitterSetting(prevState));
          }
        } else toastWarning("Enter Twitter Username");
      } else {
        toastWarning("Enter API keys under Twitter Setting");
      }
    } else {
      if (twitterSetting.twitterMonitor) {
        if (name === "startAutoInviteJoiner") {
          if (selectedChrome !== undefined && selectedChrome !== null) {
            if (Object.keys(selectedClaimer).length > 0) {
              let log = `Twitter  monitor IJ start ${getEncryptedToken(
                selectedClaimer["value"]
              )}`;
              sendLogs(log);
              dispatch(setTwitterSetting(prevState));
            } else toastWarning("Select Discord Accounts");
          }
        } else {
          let log = `Twitter  monitor LO start`;
          sendLogs(log);
          dispatch(setTwitterSetting(prevState));
        }
      }
    }
  };

  /**
   * function handle navigate to twitter setting page
   **/
  const handleScreen = () => {
    setSettingPage(!settingPage);
  };

  /**
   * function handle clearAll tweets in latest and feature section
   **/
  const handleDeleteAllTweets = (key) => {
    let prevState = { ...twitterSetting };
    if (prevState["twitterMonitor"]) {
      prevState["monitorStartDate"] = new Date().toUTCString();
      dispatch(setTwitterSetting(prevState));
    }
    if (key === "LATEST" && Object.keys(latestTweetList).length === 0) {
      toastWarning("Nothing to remove");
    } else if (
      key === "FEATURE" &&
      Object.keys(featureTweetList).length === 0
    ) {
      toastWarning("Nothing to remove");
    }
    dispatch(clearTweetsFeeder(key));
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
            appTheme,
          }}
        />
      ) : (
        <TwitterSettingScreen
          {...{
            handleScreen,
            latestTweetList,
            apiList,
            rotaterIndex,
            twitterSetting,
          }}
        />
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
  appTheme,
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
          <TwitterKeywordListSection {...{ keyWordList }} appTheme={appTheme} />
          <TwitterUserListSection {...{ userList }} appTheme={appTheme} />
        </div>
      </div>
      <div className="twitter-page-right-section">
        <div className="twitter-page-card-scroll-flex">
          <div>
            <TwitterPageCardScroll
              list={Object.keys(latestTweetList)
                .map((key) => latestTweetList[key])
                .reverse()}
              title="Latest Tweets"
              onClearTweets={() => handleDeleteAllTweets("LATEST")}
              appTheme={appTheme}
              keyWordList={keyWordList}
            />
          </div>
          <div>
            <TwitterPageCardScroll
              isFeatureTweet={true}
              list={Object.keys(featureTweetList)
                .map((key) => featureTweetList[key])
                .reverse()}
              twitterSetting={twitterSetting}
              title="Featured Tweets"
              onClearTweets={() => handleDeleteAllTweets("FEATURE")}
              appTheme={appTheme}
              keyWordList={keyWordList}
            />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

// {
//   consumer_key: "gYk4H5IhLUjmx5Kqb40ZJ8vmq",
//   consumer_secret: "1xFOIZIyAU5QalGkNv0cggrmm2DXwjnnQItsKOW2C356IRdfsh",
// },
// {
//   consumer_key: "cCPyXGNaaGzh5QWSGrUpl9aAe",
//   consumer_secret: "JX3QpsLoOFxepOvefL4uN9tNW7WzRQZSbGOQjlof5hyQ638CVU",
// },
