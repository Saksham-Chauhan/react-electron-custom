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
  onClearTweets,
}) {
  return (
    <div className="twitter-scroller-outer">
      <h3>{title}</h3>
      <AppSpacer spacer={10} />
      <div className="twitter-scroller-inner">
        <div onClick={onClearTweets} className="twitter-scroller-del-btn btn">
          <UseAnimations
            animation={trash2}
            strokeColor="#B60E0E"
            size={25}
            wrapperStyle={{ cursor: "pointer" }}
          ></UseAnimations>
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
                  key={`${tweet["id"]}-${index}`}
                  tweetUser={tweet["userName"]}
                  tweetTime={tweet["created_at"]}
                  tweetLink={tweet["tweetLink"]}
                  tweetUserFollowing={tweet["followingLink"]}
                  tweetUserProfileLink={tweet["profileLink"]}
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
