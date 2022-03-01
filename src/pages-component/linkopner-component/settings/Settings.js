import React from "react";
import { useDispatch } from "react-redux";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";
import { discordTokenRegExp } from "../../../constant/regex";
import { linkOpenerSettingHandler } from "../../../features/logic/discord-account";
import { toastWarning } from "../../../toaster";

function Settings({ selectedMonitorToken, settingOption }) {
  const dispatch = useDispatch();

  const handleLinkOpenerToggle = (e) => {
    const { checked } = e.target;
    if (discordTokenRegExp.test(selectedMonitorToken)) {
      dispatch(linkOpenerSettingHandler({ key: "TOGGLER_STATE", checked }));
    } else toastWarning("Select Monitor token");
  };

  const handleChromeuserSelection = ({ value }) => {
    dispatch(linkOpenerSettingHandler({ key: "CHROME_USER", value }));
  };

  return (
    <div>
      <AppSpacer spacer={30} />
      <div className="switch-with-text">
        <AppToggler
          checked={settingOption?.linkOpenerState}
          id="link-opener-toggle-state"
          onChange={handleLinkOpenerToggle}
        />
        <span>Stop Auto Link Opener</span>
      </div>
      <AppSpacer spacer={30} />
      <div className="linkopner-chrome-user-section">
        <AppInputField
          fieldTitle="Chrome User"
          hideLabel={true}
          isCustomLabel={true}
          onChange={handleChromeuserSelection}
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
