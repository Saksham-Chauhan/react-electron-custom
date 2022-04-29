import React from "react";
import "./styles.css";
import { TwitterPageTweetCard } from "../..";
import { AppSpacer } from "../../../component";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";

function CardScroller({
  title,
  list = [],
  isFeatureTweet = false,
  onClearTweets = () => {},
  appTheme,
}) {
  return (
    <div className="twitter-scroller-outer">
      <h3 className={appTheme ? "lightMode_color" : ""}>{title}</h3>
      <AppSpacer spacer={10} />
      <div
        className={
          appTheme ? "twitter-scroller-inner lightBg" : "twitter-scroller-inner"
        }
      >
        <div
          onClick={onClearTweets}
          className="twitter-scroller-del-btn btn"
          style={{
            background: appTheme ? "none" : "",
            border: appTheme ? "1px solid #0D0027" : "",
          }}
        >
          <UseAnimations
            animation={trash2}
            strokeColor="#B60E0E"
            size={25}
            wrapperStyle={{ cursor: "pointer" }}
          />
        </div>
        <AppSpacer spacer={10} />
        <div className="scroll-card-content">
          {list?.map((data, index) => {
            let tweet = { ...data };
            if (isFeatureTweet) {
              let text = "";
              if (tweet.featured_type === "Binary") {
                text = tweet.binaryText;
              } else if (tweet.featured_type === "Base64") {
                text = tweet.base64Text;
              } else if (
                tweet.featured_type === "Maths" ||
                !!tweet.mathSolved
              ) {
                text = tweet.mathSolved;
              } else if (tweet.featured_type === "Pastebin") {
                text = tweet.pastebinText.toString();
              } else if (
                tweet.featured_type === "URLs extracted" ||
                tweet.urlsExtracted?.length > 0
              ) {
                text = tweet.urlsExtracted.toString();
              } else if (tweet.featured_type === "QR") {
                text = tweet.qrText.toString();
              } else if (tweet.featured_type === "OCR") {
                text = tweet.ocrText.toString();
              }
              return (
                <TwitterPageTweetCard
                  tweetMsgLink={text}
                  appTheme={appTheme}
                  isFeatureCard={true}
                  tweetUser={tweet["userName"]}
                  tweetLink={tweet["tweetLink"]}
                  key={`${tweet["id"]}-${index}`}
                  tweetTime={new Date(tweet["created_at"]).toLocaleString()}
                  tweetUserFollowing={tweet["followingLink"]}
                  tweetUserProfileLink={tweet["profileLink"]}
                  cardTitle={`${tweet["featured_type"]} Found`}
                />
              );
            } else {
              return (
                <TwitterPageTweetCard
                  appTheme={appTheme}
                  tweetMsgLink={tweet["text"]}
                  tweetUser={tweet["userName"]}
                  tweetTime={new Date(tweet["createAt"]).toLocaleString()}
                  tweetLink={tweet["tweetLink"]}
                  key={`${tweet["id"]}-${index}`}
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
