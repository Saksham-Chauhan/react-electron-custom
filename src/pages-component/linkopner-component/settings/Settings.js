import React from "react";
import "./styles.css";
import {
  setModalState,
  setEditStorage,
  setLOchromeUser,
  fetchLOchromeUserState,
  fetchChromeUserListState,
} from "../../../features/counterSlice";
import { isValueInUse } from "../../../helper";
import { toastWarning } from "../../../toaster";
import {
  deleteAccountFromList,
  linkOpenerSettingHandler,
} from "../../../features/logic/discord-account";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { discordTokenRegExp } from "../../../constant/regex";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";

function Settings({ selectedMonitorToken, settingOption, accountList }) {
  const dispatch = useDispatch();
  const chromeList = useSelector(fetchChromeUserListState);
  const selectedChrome = useSelector(fetchLOchromeUserState);

  /**
   * function handle modal state
   **/
  const handleOpenModal = () => {
    dispatch(setModalState("discordAccount"));
  };

  const handleLinkOpenerToggle = (e) => {
    const { checked } = e.target;
    if (accountList.length > 0) {
      if (discordTokenRegExp.test(selectedMonitorToken["discordToken"])) {
        dispatch(linkOpenerSettingHandler({ key: "TOGGLER_STATE", checked }));
      } else toastWarning("Select Monitor token");
    } else toastWarning("Create some account");
  };

  /**
   * function handle edit account card state
   **/
  const handleEditAccount = () => {
    if (accountList.length > 0) {
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
    } else toastWarning("Create some account");
  };

  /**
   * function handle delete account card state
   **/
  const handleDeleteAccount = () => {
    if (accountList.length > 0) {
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
    } else toastWarning("Create some account");
  };

  const handleSelectedChrome = (user) => {
    dispatch(setLOchromeUser(user));
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
          <span>
            {settingOption?.linkOpenerState ? "Stop" : "Start"} Auto Link Opener
          </span>
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
          onChange={handleSelectedChrome}
          isSelect={true}
          selectOptions={chromeList}
          placeholderText="Select Chrome Profile"
          value={chromeList.filter((d) => d["id"] === selectedChrome?.id)}
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
