import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSpacer, AppToggler } from "../../../component";
import { webhoookRegExp } from "../../../constant/regex";
import { fetchWebhookSettingState } from "../../../features/counterSlice";
import {
  addWebhookInList,
  toggleSettingSwitch,
} from "../../../features/logic/setting";
import "./styles.css";

function WebhookSetting() {
  const dispatch = useDispatch();
  const [webhook, setWebhook] = useState("");
  const option = useSelector(fetchWebhookSettingState);

  const handleToggle = (e) => {
    const { checked, id } = e.target;
    if (id === "link-opener") {
      dispatch(toggleSettingSwitch({ key: "LO", checked }));
    } else if (id === "invite-joiner") {
      dispatch(toggleSettingSwitch({ key: "IJ", checked }));
    } else if (id === "twitter-monitor") {
      dispatch(toggleSettingSwitch({ key: "TWITTER", checked }));
    } else if (id === "log-on/off") {
      dispatch(toggleSettingSwitch({ key: "LOG", checked }));
    } else {
      dispatch(toggleSettingSwitch({ key: "ANIMATION", checked }));
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setWebhook(value);
  };

  const handleTest = () => {
    if (webhoookRegExp.test(webhook)) {
      dispatch(addWebhookInList(webhook));
      setWebhook("");
    }
  };

  return (
    <div className="webhook-setting-outer">
      <h2>Webhook</h2>
      <AppSpacer spacer={14} />
      <div className="webhook-setting-inner">
        <div className="webhook-input-section">
          <input
            onChange={handleChange}
            value={webhook}
            placeholder="Enter Webhook"
            type="text"
          />
          <div onClick={handleTest} className="webhook-test btn">
            <span>Test</span>
          </div>
        </div>
        <AppSpacer spacer={50} />
        <div className="setting-toggle-wrapper">
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.linkOpener || false}
              id="link-opener"
            />
            <span>Link Opener</span>
          </div>
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.inviteJoiner || false}
              id="invite-joiner"
            />
            <span>Invite Joiner</span>
          </div>
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.twitterMonitor || false}
              id="twitter-monitor"
            />
            <span>Twitter Monitor</span>
          </div>
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.logOnOff || false}
              id="log-on/off"
            />
            <span>Log On/Off</span>
          </div>
        </div>
        <AppSpacer spacer={50} />
        <div className="system-setting">
          <label>System Toogle</label>
          <AppSpacer spacer={10} />
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.bgAnimation || false}
              id="background-animation"
            />
            <span>Background Animation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebhookSetting;
