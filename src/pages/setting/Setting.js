import React from "react";
import { AppSpacer } from "../../component";
import {
  SettingTopSection,
  SeetingUserProfile,
  SettingWebhookSection,
  SettingChromeUserSection,
  SettingCalimerGroupSection,
} from "../../pages-component";
import "./styles.css";

function Setting() {
  return (
    <div className="setting-page-outer">
      <SettingTopSection />
      <div className="setting-page-padding">
        <AppSpacer spacer={50} />
        <SeetingUserProfile />
        <AppSpacer spacer={100} />
        <div className="setting-page-section-col">
          <div className="setting-global-section">
            <SettingWebhookSection />
          </div>
          <div className="chrome-user-section">
            <SettingChromeUserSection />
          </div>
          <div className="claimer-group-section">
            <SettingCalimerGroupSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
