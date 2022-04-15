import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  appendWebhookInList,
  fetchWebhookListState,
  fetchWebhookSettingState,
} from "../../../features/counterSlice";

import { useDispatch, useSelector } from "react-redux";
import { webhookTest } from "../../../helper/webhook";
import { webhoookRegExp } from "../../../constant/regex";
import { AppSpacer, AppToggler } from "../../../component";
import { exportLogs } from "../../../helper/electron-bridge";
import { toastSuccess, toastWarning } from "../../../toaster";
import { toggleSettingSwitch } from "../../../features/logic/setting";

function WebhookSetting({ userDetails }) {
  const dispatch = useDispatch();
  const [webhook, setWebhook] = useState("");
  const option = useSelector(fetchWebhookSettingState);
  const webhookList = useSelector(fetchWebhookListState);

  useEffect(() => {
    if (webhookList?.length > 0) {
      setWebhook(webhookList[0]);
    }
  }, [webhookList]);

  const handleToggle = (e) => {
    const { checked, id } = e.target;
    if (id !== "background-animation") {
      if (webhookList.length > 0 && webhookList[0].length > 0) {
        if (id === "link-opener") {
          dispatch(toggleSettingSwitch({ key: "LO", checked }));
        } else if (id === "invite-joiner") {
          dispatch(toggleSettingSwitch({ key: "IJ", checked }));
        } else if (id === "twitter-monitor") {
          dispatch(toggleSettingSwitch({ key: "TWITTER", checked }));
        } else if (id === "log-on/off") {
          dispatch(toggleSettingSwitch({ key: "LOG", checked }));
        }
      } else toastWarning("Enter webhook!!");
    } else {
      dispatch(toggleSettingSwitch({ key: "ANIMATION", checked }));
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setWebhook(value);
    dispatch(appendWebhookInList(value));
  };

  const handleWebhook = async () => {
    if (webhoookRegExp.test(webhook)) {
      const webhookResponse = await webhookTest(
        webhook,
        userDetails?.username,
        userDetails?.avatar
      );
      if (webhookResponse.status === 204) {
        toastSuccess("Webhook tested successfully 🥳");
      }
    } else toastWarning("Enter valid Discord webhook");
  };

  const handleExportLog = () => {
    exportLogs();
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
        <AppSpacer spacer={20} />
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
        <AppSpacer spacer={40} />
        <div className="setting-system-control">
          <div className="system-setting">
            <label>System Toggle</label>
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
        <AppSpacer spacer={18} />
        <div className="system-setting log-report">
          <label>Export logs</label>
          <svg
            onClick={handleExportLog}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.33333 1.33333C6.96514 1.33333 6.66667 1.03486 6.66667 0.666667C6.66667 0.298477 6.96514 0 7.33333 0H11.3333C11.5101 0 11.6797 0.070238 11.8047 0.195262C11.9298 0.320287 12 0.489856 12 0.666667L12 4.66667C12 5.03486 11.7015 5.33333 11.3333 5.33333C10.9651 5.33333 10.6667 5.03486 10.6667 4.66667L10.6667 2.27614L4.4714 8.4714C4.21106 8.73175 3.78894 8.73175 3.5286 8.4714C3.26825 8.21105 3.26825 7.78894 3.5286 7.52859L9.72386 1.33333H7.33333ZM0 2.66667C0 1.93029 0.596954 1.33333 1.33333 1.33333H4.66667C5.03486 1.33333 5.33333 1.63181 5.33333 2C5.33333 2.36819 5.03486 2.66667 4.66667 2.66667H1.33333V10.6667H9.33333V7.33333C9.33333 6.96514 9.63181 6.66667 10 6.66667C10.3682 6.66667 10.6667 6.96514 10.6667 7.33333V10.6667C10.6667 11.403 10.0697 12 9.33333 12H1.33333C0.596954 12 0 11.403 0 10.6667V2.66667Z" />
          </svg>
        </div>
        <AppSpacer spacer={10} />
      </div>
    </div>
  );
}

export default WebhookSetting;
