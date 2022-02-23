import React from "react";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";

function Settings() {
  return (
    <div>
      <AppSpacer spacer={30} />
      <div className="switch-with-text">
        <AppToggler />
        <span>Stop Auto Link Opener</span>
      </div>
      <AppSpacer spacer={30} />
      <div className="linkopner-chrome-user-section">
        <AppInputField
          fieldTitle="Chrome User"
          hideLabel={true}
          isCustomLabel={true}
          isSelect={true}
          placeholderText="Select Chrome Profile"
        />
      </div>
      <AppSpacer spacer={20} />
      <div className="linkopener-urlappender-section">
        <div className="linkopner-urlappender-input">
          <AppInputField
            fieldTitle="URL Appender"
            hideLabel={true}
            isCustomLabel={true}
          />
        </div>
        <div className="linkopener-urlappender-btn btn">
          <span>Disabled</span>
        </div>
      </div>
      <AppSpacer spacer={35} />
    </div>
  );
}

export default Settings;
