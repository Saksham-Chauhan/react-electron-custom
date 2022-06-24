import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discordServerInviteReactAPI } from "../api";
import { TweetHandlerRegExp } from "../constant/regex";
import {
  fetchAPIlistState,
  fetchApiRotaterIndex,
  fetchFeatureTweetList,
  fetchLatestTweetList,
  fetchThemsState,
  fetchTwitterChromeUserState,
  fetchTwitterClaimerGroupState,
  fetchTwitterKeywordList,
  fetchTwitterSettingState,
  fetchTwitterUserList,
  fetchWebhookListState,
  fetchWebhookSettingState,
  incrementApiRotater,
} from "../features/counterSlice";
import { appendNewTweetInList } from "../features/logic/twitter";
import { sendLogs } from "../helper/electron-bridge";
import tweetHelper from "../pages/twitter/utils/feature-tweets/helper";
import tweetScanner from "../pages/twitter/utils/feature-tweets/scanner";
const open = window.require("open");

export const useTweetFetchingHook = () => {
  const dispatch = useDispatch();

  const apiList = useSelector(fetchAPIlistState);
  const userList = useSelector(fetchTwitterUserList);
  const rotaterIndex = useSelector(fetchApiRotaterIndex);
  const webhookList = useSelector(fetchWebhookListState);
  const keyWordList = useSelector(fetchTwitterKeywordList);
  const latestTweetList = useSelector(fetchLatestTweetList);
  const featureTweetList = useSelector(fetchFeatureTweetList);
  const twitterSetting = useSelector(fetchTwitterSettingState);
  const webhookSetting = useSelector(fetchWebhookSettingState);
  const selectedChrome = useSelector(fetchTwitterChromeUserState);
  const selectedClaimer = useSelector(fetchTwitterClaimerGroupState);
  const appTheme = useSelector(fetchThemsState);
  const [isStart, setIsStart] = useState(false);
  const fetch = async () => {
    try {
      userList.forEach(async (tweetUser) => {
        if (TweetHandlerRegExp.test(tweetUser["value"])) {
          const newTweets = {};
          // const newTweets = await getTweets(
          //   apiList[rotaterIndex]?.apiKey,
          //   apiList[rotaterIndex]?.apiSecret,
          //   tweetUser['value'],
          // )
          if (newTweets !== undefined && typeof newTweets !== "string") {
            const twitterStart = twitterSetting["monitorStartDate"];
            if (new Date(newTweets["created_at"]) > new Date(twitterStart)) {
              dispatch(
                appendNewTweetInList({
                  key: "LATEST",
                  tweet: tweetHelper.extractDataFromTweet(newTweets),
                })
              );
              let ft;
              if (!("id" in latestTweetList)) {
                ft = await tweetScanner(
                  newTweets,
                  keyWordList,
                  webhookList[0],
                  twitterSetting,
                  webhookSetting,
                  latestTweetList
                );
              }
              if (ft.featured_type) {
                dispatch(appendNewTweetInList({ key: "FEATURE", tweet: ft }));
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
                          const tkn =
                            token?.split(":")[3]?.substring(0, 4) + "## ##";
                          try {
                            const info = await discordServerInviteReactAPI(
                              inviteCode,
                              token?.split(":")[3]
                            );
                            if (info.status === 200) {
                              // let log = `Successfully Joined ${info.data.guild.name} with ${tkn}`
                              // sendLogs(log)
                              // toastSuccess(
                              //   `Successfully Joined ${info.data.guild.name}`,
                              // )
                            }
                          } catch (err) {
                            //   let log = `Error in joininig server ${err.message} with ${tkn}`
                            //   sendLogs(log)
                            //   toastWarning(
                            //     `Error in joininig server ${err.message}`,
                            //   )
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
        }
      });
    } catch (error) {
      const log = `${error.message} ${apiList[rotaterIndex]?.apiName}`;
      sendLogs(log);
      dispatch(incrementApiRotater());
    }
  };
  const startMonitor = async () => {
    if (twitterSetting?.twitterMonitor) {
      if (isStart) {
        await fetch();
      } else {
        console.log("MONITO STOPPED");
      }
    }
  };

  return [startMonitor, setIsStart];
};
