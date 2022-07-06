import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  addClientCaptchaKey,
  appendWebhookInList,
  fetchClientCaptchaKey,
  fetchThemsState,
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
  const appTheme = useSelector(fetchThemsState);
  const cKey = useSelector(fetchClientCaptchaKey);

  const theme = {
    webhookSettingInner: appTheme
      ? "webhook-setting-inner light-bg "
      : "webhook-setting-inner",
    inputStyle: {
      background: appTheme ? "none" : "",
      color: appTheme ? "#706A6A" : "",
      border: appTheme ? "1px solid #0D0027" : "",
    },
    webhookTestBtn: appTheme
      ? "webhook-test btn light-mode-sidebar"
      : "webhook-test btn ",
    textClass: appTheme ? " lightMode_color " : "",
  };

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
        } else if (id === "tasks") {
          dispatch(toggleSettingSwitch({ key: "TASKS", checked }));
        } else if (id === "eth-minter") {
          dispatch(toggleSettingSwitch({ key: "ETH", checked }));
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
  const handleCaptchaKey = (e) => {
    dispatch(addClientCaptchaKey(e.target.value));
  };

  return (
    <div className="webhook-setting-outer">
      <h2 className={theme.textClass}>Webhook</h2>
      <AppSpacer spacer={14} />
      <div className={theme.webhookSettingInner}>
        <div className="webhook-input-section ">
          <input
            onChange={handleChange}
            value={webhook}
            placeholder="Enter Webhook"
            type="text"
            style={theme.inputStyle}
          />
          <div onClick={handleWebhook} className={theme.webhookTestBtn}>
            <span>Test</span>
          </div>
        </div>

        <AppSpacer spacer={10} />
        <div className="setting-toggle-wrapper">
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.linkOpener || false}
              id="link-opener"
            />
            <span className={theme.textClass}>Link Opener</span>
          </div>
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.inviteJoiner || false}
              id="invite-joiner"
            />
            <span className={theme.textClass}>Invite Joiner</span>
          </div>
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.twitterMonitor || false}
              id="twitter-monitor"
            />
            <span className={theme.textClass}>Twitter Monitor</span>
          </div>
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.logOnOff || false}
              id="log-on/off"
            />
            <span className={theme.textClass}>Log On/Off</span>
          </div>
        </div>
        <AppSpacer spacer={10} />
        <div className="d-flex toggler-row-two">
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.ethMinter || false}
              id="eth-minter"
            />
            <span className={theme.textClass}>ETH Minter</span>
          </div>
          <div className="setting-toggle-with-label">
            <AppToggler
              onChange={handleToggle}
              checked={option?.tasks || false}
              id="tasks"
            />
            <span className={theme.textClass}>Tasks</span>
          </div>
        </div>
        <AppSpacer spacer={13} />
        <div className="setting-system-control">
          <div className="system-setting">
            <label className={theme.textClass}>System Toggle</label>
            <AppSpacer spacer={10} />
            <div className="setting-toggle-with-label">
              <AppToggler
                onChange={handleToggle}
                checked={option?.bgAnimation || false}
                id="background-animation"
              />
              <span className={theme.textClass}>Background Animation</span>
            </div>
          </div>
        </div>
        <AppSpacer spacer={10} />
        <div className="webhook-input-section system-setting">
          <label className={theme.textClass}>Anticap Key</label>
          <input
            onChange={handleCaptchaKey}
            value={cKey}
            placeholder="Enter client key to resolve captcha"
            type="text"
            style={theme.inputStyle}
          />
        </div>
        <AppSpacer spacer={5} />
        <div className="system-setting log-report">
          <label className={theme.textClass}>Export logs</label>

          {appTheme ? (
            <svg
              onClick={handleExportLog}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1507_86)">
                <path
                  d="M15.8696 16.6304V17.7174C15.8696 18.1956 15.4565 18.4783 14.9783 18.4783H0.782609C0.304348 18.4783 0 18.2174 0 17.7174V6.97825C0 6.49999 0.304348 6.06521 0.782609 6.06521H3.32609C3.80435 6.06521 4.19565 6.45651 4.19565 6.93477C4.19565 7.41303 3.80435 7.80434 3.32609 7.80434H1.73913V16.7391H14.1304V16.6304C14.1304 16.1522 14.5217 15.7609 15 15.7609C15.4783 15.7609 15.8696 16.1522 15.8696 16.6304ZM19.7391 8.52173L14.3478 14.0217C14.087 14.2826 13.7174 14.3478 13.3913 14.2174C13.0435 14.0652 12.8261 13.7609 12.8261 13.3913V11.0217C11.087 10.9783 6.91304 11.1522 5.3913 13.8261C5.23913 14.1087 4.93478 14.2826 4.63043 14.2826C4.56522 14.2826 4.47826 14.2826 4.41304 14.2609C4.02174 14.1522 3.76087 13.8043 3.76087 13.413C3.76087 13.2826 3.76087 9.91303 6.28261 7.41303C7.86956 5.7826 10 4.91303 12.8261 4.76086V2.39129C12.8261 2.04347 13.0435 1.71738 13.3696 1.58695C13.7174 1.45651 14.087 1.52173 14.3478 1.7826L19.7609 7.2826C20.087 7.63042 20.087 8.1739 19.7391 8.52173V8.52173ZM17.8696 7.89129L14.5652 4.54347V5.60869C14.5652 6.08695 14.1957 6.47825 13.6957 6.47825C11 6.47825 8.93478 7.19564 7.52174 8.63042C6.86956 9.2826 6.43478 9.99999 6.15217 10.6956C8.19565 9.47825 10.7826 9.26086 12.3696 9.26086C13.1957 9.26086 13.7391 9.32608 13.8043 9.32608C14.2391 9.36956 14.5652 9.76086 14.5652 10.1956V11.2609L17.8696 7.89129V7.89129Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1507_86">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              onClick={handleExportLog}
              xmlns="http://www.w3.org/2000/svg"
              width="92"
              height="92"
              viewBox="0 0 92 92"
            >
              <path d="M73 76.5v5c0 2.2-1.9 3.5-4.1 3.5H3.6C1.4 85 0 83.8 0 81.5V32.1c0-2.2 1.4-4.2 3.6-4.2h11.7c2.2 0 4 1.8 4 4s-1.8 4-4 4H8V77h57v-.5c0-2.2 1.8-4 4-4s4 1.8 4 4zm17.8-37.3L66 64.5c-1.2 1.2-2.9 1.5-4.4.9-1.6-.7-2.6-2.1-2.6-3.8V50.7c-8-.2-27.2.6-34.2 12.9-.7 1.3-2.1 2.1-3.5 2.1-.3 0-.7 0-1-.1-1.8-.5-3-2.1-3-3.9 0-.6 0-16.1 11.6-27.6C36.2 26.6 46 22.6 59 21.9V11c0-1.6 1-3.1 2.5-3.7 1.6-.6 3.3-.3 4.5.9l24.9 25.3c1.5 1.6 1.5 4.1-.1 5.7zm-8.6-2.9L67 20.9v4.9c0 2.2-1.7 4-4 4-12.4 0-21.9 3.3-28.4 9.9-3 3-5 6.3-6.3 9.5 9.4-5.6 21.3-6.6 28.6-6.6 3.8 0 6.3.3 6.6.3 2 .2 3.5 2 3.5 4v4.9l15.2-15.5z" />
            </svg>
          )}
        </div>
        <AppSpacer spacer={10} />
      </div>
    </div>
  );
}

export default WebhookSetting;
