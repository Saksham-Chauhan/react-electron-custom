import React from "react";
import { AppSpacer, AppToggler } from "../../../component";
import "./styles.css";

function TopLeftSection({ handleScreen, twitterSetting, handleToggle }) {
  return (
    <div>
      <div className="flex-btn-row">
        <div style={{ padding: "0.8em" }} className="switch-with-text">
          <AppToggler
            checked={twitterSetting?.twitterMonitor}
            id="turn-twitter-monitor"
            name="twitterMonitor"
            onChange={handleToggle}
          />
          <span>Turn OFF Monitor</span>
        </div>
        <div
          style={{ padding: "0.8em 1em" }}
          onClick={handleScreen}
          className="switch-with-text with-no-toggle btn"
        >
          <span>Twitter Settings</span>
        </div>
      </div>
      <AppSpacer spacer={30} />
      <div className="custom-twitter-toggle">
        <div className="custom-twitter-label">
          <h3>Auto Link Opener/Joiner</h3>
        </div>
        <AppSpacer spacer={20} />
        <div className="flex-btn-row toogle-wrapper">
          <div className="switch-with-text">
            <AppToggler
              checked={twitterSetting?.startAutoLinkOpener}
              id="twitter-auto-link-opener"
              name="startAutoLinkOpener"
              onChange={handleToggle}
            />
            <span>Start Auto Link Opener</span>
          </div>
          <div className="switch-with-text">
            <AppToggler
              checked={twitterSetting?.startAutoInviteJoiner}
              id="twitter-auto-invit-joiner"
              name="startAutoInviteJoiner"
              onChange={handleToggle}
            />
            <span>Stop Auto Invite Joiner</span>
          </div>
        </div>
      </div>
      <AppSpacer spacer={30} />
    </div>
  );
}

export default TopLeftSection;
