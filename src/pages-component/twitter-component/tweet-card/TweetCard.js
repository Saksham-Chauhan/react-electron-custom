import React from "react";
import "./styles.css";
import { AppSpacer } from "../../../component";
import bird from "../../../assests/images/bird.svg";
import helper from "../../../pages/twitter/utils//feature-tweets/helper";
function TweetCard({
  cardTitle = "Tweet",
  tweetTime = "Fri Feb 21 12:07:35 +0000 2022",
  tweetUser = "KodersHQ",
  tweetMsgLink = "https://t.co/uxttXwyy4F",
  tweetLink = "",
  tweetUserProfileLink = "",
  tweetUserFollowing = "",
  isFeatureCard = false,
}) {
  return (
    <div className=" tweet-card-outer">
      <div className="tweet-card-top-section">
        <span id="cardtitle">
          {cardTitle === "URLs extracted Found"
            ? helper.isDiscordInvite(tweetMsgLink)
              ? "Invite Found"
              : "Link Found"
            : cardTitle}
        </span>
        <span id="tweetTime">{tweetTime}</span>
      </div>
      <AppSpacer spacer={20} />
      <div className="tweet-card-middle-section">
        <div className="twitter-logo">
          <img src={bird} alt="" />
          <span>{tweetUser}</span>
        </div>
        {isFeatureCard ? (
          <p className="feature-tweet-text">
            Extracted text : <span>{tweetMsgLink}</span>
          </p>
        ) : (
          <span>{tweetMsgLink}</span>
        )}
      </div>
      <AppSpacer spacer={20} />
      <div className="tweet-card-bottom-section">
        <div className="cursor-pointer" onClick={() => window.open(tweetLink)}>
          Tweet
        </div>
        <div
          className="cursor-pointer"
          onClick={() => window.open(tweetUserProfileLink)}
        >
          Profile
        </div>
        <div
          className="cursor-pointer"
          onClick={() => window.open(tweetUserFollowing)}
        >
          View Following
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
