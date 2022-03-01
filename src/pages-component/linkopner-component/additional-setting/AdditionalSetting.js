import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { AppCheckbox, AppSpacer } from "../../../component";
import { linkOpenerSettingHandler } from "../../../features/logic/discord-account";

function AdditionalSetting({ settingOption }) {
  const dispatch = useDispatch();

  const handleAdditionSetting = (e) => {
    const { name, checked } = e.target;
    dispatch(linkOpenerSettingHandler({ key: name, checked }));
  };

  return (
    <div className="linkopener-additional-setting">
      <AppSpacer spacer={20} />
      <h3>Options</h3>
      <AppSpacer spacer={10} />
      <div className="additional-setting-option">
        <AppCheckbox
          name="SOUND"
          onChange={handleAdditionSetting}
          checked={settingOption?.playSound}
        />
        <span>Play Sound</span>
      </div>
      <div className="additional-setting-option">
        <AppCheckbox
          name="IGNORE_TWITTER_LINK"
          onChange={handleAdditionSetting}
          checked={settingOption?.ignoreTwitterLink}
        />
        <span>Ignore Twitter Link</span>
      </div>
      <div className="additional-setting-option">
        <AppCheckbox
          name="IGNORE_DISCORD_INVITE"
          onChange={handleAdditionSetting}
          checked={settingOption?.ignoreDiscordInviteLink}
        />
        <span>Ignore Discord Invite</span>
      </div>
      <AppSpacer spacer={20} />
    </div>
  );
}

export default AdditionalSetting;
