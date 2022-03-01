import React from "react";
import "./styles.css";
import trash from "../../../assests/images/trash.svg";
import { AppSpacer } from "../../../component";
function CardScroller({ title, list, isFeatureTweet = false }) {
  return (
    <div className="twitter-scroller-outer">
      <h3>{title}</h3>
      <AppSpacer spacer={10} />
      <div className="twitter-scroller-inner">
        <div className="twitter-scroller-del-btn btn">
          <img src={trash} alt="del-icon" />
        </div>
        <div className="scroll-card-content"></div>
      </div>
    </div>
  );
}

export default CardScroller;
