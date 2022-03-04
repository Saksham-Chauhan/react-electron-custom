import React from "react";
import {
  deleteAccountFromList,
  linkOpenerSettingHandler,
} from "../../../features/logic/discord-account";
import "./styles.css";
import { useDispatch } from "react-redux";
import { toastWarning } from "../../../toaster";
import { isValueInUse } from "../../../helper";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import { discordTokenRegExp } from "../../../constant/regex";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";
import { setEditStorage, setModalState } from "../../../features/counterSlice";

function Settings({ selectedMonitorToken, settingOption, accountList }) {
  const dispatch = useDispatch();

  /**
   * function handle modal state
   **/
  const handleOpenModal = () => {
    dispatch(setModalState("discordAccount"));
  };

  const handleLinkOpenerToggle = (e) => {
    const { checked } = e.target;
    if (discordTokenRegExp.test(selectedMonitorToken["discordToken"])) {
      dispatch(linkOpenerSettingHandler({ key: "TOGGLER_STATE", checked }));
    } else toastWarning("Select Monitor token");
  };

  const handleChromeuserSelection = ({ value }) => {
    dispatch(linkOpenerSettingHandler({ key: "CHROME_USER", value }));
  };

  /**
   * function handle edit account card state
   **/
  const handleEditAccount = () => {
    if (Object.keys(selectedMonitorToken).length > 0) {
      const result = isValueInUse(
        accountList,
        "discordToken",
        selectedMonitorToken
      );
      if (!result && !settingOption?.linkOpenerState) {
        dispatch(setEditStorage(selectedMonitorToken));
        handleOpenModal();
      } else toastWarning("Token in use!!");
    } else toastWarning("Select Monitor token");
  };

  /**
   * function handle delete account card state
   **/
  const handleDeleteAccount = () => {
    if (Object.keys(selectedMonitorToken).length > 0) {
      const result = isValueInUse(
        accountList,
        "discordToken",
        selectedMonitorToken
      );
      if (!result && !settingOption?.linkOpenerState) {
        dispatch(deleteAccountFromList(selectedMonitorToken));
      } else toastWarning("Token in use!!");
    } else toastWarning("Select Monitor token");
  };

  return (
    <div>
      <AppSpacer spacer={30} />
      <div className="flex-link-opener-btns">
        <div className="switch-with-text">
          <AppToggler
            checked={settingOption?.linkOpenerState}
            id="link-opener-toggle-state"
            onChange={handleLinkOpenerToggle}
          />
          <span>Stop Auto Link Opener</span>
        </div>
        <div onClick={handleEditAccount} className="linkopener-acc btn">
          <img src={edit} alt="" />
          <span>Edit Account</span>
        </div>
        <div onClick={handleDeleteAccount} className="linkopener-acc btn">
          <img src={trash} alt="" />
          <span>Delete Account</span>
        </div>
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
