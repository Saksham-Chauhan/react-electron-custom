import React from "react";
import "./styles.css";
import { AppSpacer } from "../../../component";
import bird from "../../../assests/images/bird.svg";

function TweetCard({
  // cardTitle = "Tweet",
  tweetTime = "Fri Feb 21 12:07:35 +0000 2022",
  tweetUser = "KodersHQ",
  tweetMsgLink = "https://t.co/uxttXwyy4F",
  tweetLink = "",
  tweetUserProfileLink = "",
  tweetUserFollowing = "",
}) {
  const getTitle = () => {
    if (tweetMsgLink.includes("discord")) {
      return "Invite Link Found";
    }
    if (
      tweetMsgLink.includes("https") ||
      tweetMsgLink.includes("http") ||
      tweetMsgLink.includes(".com")
    ) {
      return "Link Found";
    }
    return "Tweet";
  };
  return (
    <div className=" tweet-card-outer">
      <div className="tweet-card-top-section">
        <span id="cardtitle">{getTitle()}</span>
        <span id="tweetTime">{tweetTime}</span>
      </div>
      <AppSpacer spacer={20} />
      <div className="tweet-card-middle-section">
        <div className="twitter-logo">
          <img src={bird} alt="" />
          <span>{tweetUser}</span>
        </div>
        <span>{tweetMsgLink}</span>
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
