import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSpacer, AppToggler } from "../../../component";
import { webhoookRegExp } from "../../../constant/regex";
import {
  appendWebhookInList,
  fetchWebhookListState,
  fetchWebhookSettingState,
} from "../../../features/counterSlice";
import { toggleSettingSwitch } from "../../../features/logic/setting";
import { webhookTest } from "../../../helper/webhook";
import { toastWarning } from "../../../toaster";
import "./styles.css";

function WebhookSetting({ userDetails }) {
  const dispatch = useDispatch();
  const [webhook, setWebhook] = useState("");
  const option = useSelector(fetchWebhookSettingState);
  const webhokkList = useSelector(fetchWebhookListState);

  useEffect(() => {
    if (webhokkList.length > 0) {
      setWebhook(webhokkList[0]);
    }
  }, [webhokkList]);

  const handleToggle = (e) => {
    const { checked, id } = e.target;
    if (webhokkList.length > 0) {
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
    } else toastWarning("Enter some webhook");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setWebhook(value);
  };

  const handleWebhook = async () => {
    if (webhoookRegExp.test(webhook)) {
      const webhookResponse = await webhookTest(
        webhook,
        userDetails?.username,
        userDetails?.avatar
      );

      if (webhookResponse.status === 204) {
        dispatch(appendWebhookInList(webhook));
        setWebhook("");
      }
    } else toastWarning("Enter valid Discord webhook");
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
          <div onClick={handleWebhook} className="webhook-test btn">
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
