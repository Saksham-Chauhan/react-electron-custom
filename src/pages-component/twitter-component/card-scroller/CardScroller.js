import React, { useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { TwitterPageTweetCard } from "../..";
import { AppSpacer } from "../../../component";
import trash from "../../../assests/images/trash.svg";
import utils from "../../../pages/twitter/utils/feature-tweets/helper";

// TODO after creatimg setting page comment out the code and map the corresponding data
function CardScroller({
  title,
  list = [],
  isFeatureTweet = false,
  onClearTweets,
  twitterSetting,
}) {
  useEffect(() => {
    if (isFeatureTweet) {
      Object.keys(list).map((data) => {
        let ft = { ...list[data] };
        if (ft.urlsExtracted) {
          for (let url of ft.urlsExtracted) {
            let inviteCode = utils.isDiscordInvite(url);
            if (inviteCode) {
              if (twitterSetting?.startAutoInviteJoiner) {
                // let info = await axios.post(
                //   `https://discordapp.com/api/v9/invites/${inviteCode}`,
                //   {},
                //   {
                //     headers: {
                //       Authorization: token,
                //     },
                //   }
                // );
                // if (info.status === 200) {
                //   console.log(`Successfully Joined `);
                // } else {
                //   console.log(`Failed to join ${url}`);
                // }
              }
            } else {
              if (twitterSetting?.startAutoLinkOpener) {
                // window.open(url, {
                //   app: ["chrome", `--profile-directory=${currentUser}`],
                // });
              }
            }
          }
        }
      });
    }
  }, [list, isFeatureTweet, twitterSetting]);

  return (
    <div className="twitter-scroller-outer">
      <h3>{title}</h3>
      <AppSpacer spacer={10} />
      <div className="twitter-scroller-inner">
        <div onClick={onClearTweets} className="twitter-scroller-del-btn btn">
          <img src={trash} alt="del-icon" />
        </div>
        <AppSpacer spacer={10} />
        <div className="scroll-card-content">
          {Object.keys(list).map((data, index) => {
            let tweet = { ...list[data] };
            if (isFeatureTweet) {
              let text = "";
              if (tweet.featured_type === "Binary") {
                text = tweet.binaryText;
              } else if (tweet.featured_type === "Base64") {
                text = tweet.base64Text;
              } else if (tweet.featured_type === "Maths") {
                console.log(tweet);
                text = tweet.mathSolved;
              } else if (tweet.featured_type === "Pastebin") {
                text = tweet.pastebinText.toString();
              } else if (tweet.featured_type === "URLs extracted") {
                text = tweet.urlsExtracted;
              } else if (tweet.featured_type === "QR") {
                text = tweet.qrText.toString();
              } else if (tweet.featured_type === "OCR") {
                text = tweet.ocrText.toString();
              }
              return (
                <TwitterPageTweetCard
                  tweetMsgLink={text}
                  tweetUser={tweet["userName"]}
                  tweetTime={tweet["created_at"]}
                  tweetLink={tweet["tweetLink"]}
                  tweetUserFollowing={tweet["followingLink"]}
                  tweetUserProfileLink={tweet["profileLink"]}
                  key={`${tweet["id"]}-${index}`}
                />
              );
            } else {
              return (
                <TwitterPageTweetCard
                  key={`${tweet["id"]}-${index}`}
                  tweetMsgLink={tweet["text"]}
                  tweetUser={tweet["userName"]}
                  tweetTime={tweet["createAt"]}
                  tweetLink={tweet["tweetLink"]}
                  tweetUserFollowing={tweet["followingLink"]}
                  tweetUserProfileLink={tweet["profileLink"]}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default CardScroller;
