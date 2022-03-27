import React from "react";
import "./styles.css";
import {
  setModalState,
  setEditStorage,
  setLOchromeUser,
  fetchLOchromeUserState,
  fetchChromeUserListState,
  fetchLOChannelList,
  fetchLOKeywordList,
  fetchSelectedClaimerTokenInviteJoiner,
  fetchIJMonitorState,
} from "../../../features/counterSlice";
import { isValueInUse } from "../../../helper";
import { toastWarning } from "../../../toaster";
import {
  deleteAccountFromList,
  linkOpenerSettingHandler,
} from "../../../features/logic/discord-account";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import edit from "react-useanimations/lib/edit";
import { useDispatch, useSelector } from "react-redux";
import { discordTokenRegExp } from "../../../constant/regex";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";
import { RoutePath } from "../../../constant";
import { useNavigate } from "react-router-dom";

function Settings({ selectedMonitorToken, settingOption, accountList }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chromeList = useSelector(fetchChromeUserListState);
  const selectedChrome = useSelector(fetchLOchromeUserState);
  const keywordList = useSelector(fetchLOKeywordList);
  const channelList = useSelector(fetchLOChannelList);
  const selectedToken = useSelector(fetchSelectedClaimerTokenInviteJoiner);
  const ijMonitor = useSelector(fetchIJMonitorState);

  /**
   * function handle modal state
   **/
  const handleOpenModal = () => {
    dispatch(setModalState("discordAccount"));
  };

  const handleLinkOpenerToggle = (e) => {
    const { checked } = e.target;
    if (accountList.length > 0) {
      if (Object.keys(selectedMonitorToken).length > 0) {
        if (channelList.length > 0) {
          if (keywordList.length > 0) {
            if (discordTokenRegExp.test(selectedMonitorToken["discordToken"])) {
              dispatch(
                linkOpenerSettingHandler({ key: "TOGGLER_STATE", checked })
              );
            } else toastWarning("Select valid token");
          } else toastWarning("Enter some keywords");
        } else toastWarning("Enter some channel id");
      } else toastWarning("Select Monitor token");
    } else toastWarning("Create some account");
  };

  /**
   * function handle edit account card state
   **/
  const handleEditAccount = () => {
    if (accountList.length > 0) {
      if (Object.keys(selectedMonitorToken).length > 0) {
        const result = isValueInUse(accountList, "id", selectedMonitorToken);
        if (!settingOption?.linkOpenerState && result) {
          if (selectedMonitorToken["id"] !== selectedToken["id"]) {
            dispatch(setEditStorage(selectedMonitorToken));
            handleOpenModal();
          } else if (ijMonitor) {
            toastWarning("Account is use by invite joiner");
          } else {
            dispatch(setEditStorage(selectedMonitorToken));
            handleOpenModal();
          }
        } else toastWarning("Monitor is start or token is in use!!!");
      } else toastWarning("Select Monitor token");
    } else toastWarning("Create some account");
  };

  /**
   * function handle delete account card state
   **/
  const handleDeleteAccount = () => {
    if (accountList.length > 0) {
      if (Object.keys(selectedMonitorToken).length > 0) {
        const result = isValueInUse(accountList, "id", selectedMonitorToken);
        if (!settingOption?.linkOpenerState && result) {
          if (selectedMonitorToken["id"] !== selectedToken["id"]) {
            dispatch(deleteAccountFromList(selectedMonitorToken));
          } else if (ijMonitor) {
            toastWarning("Account is use by invite joiner");
          } else dispatch(deleteAccountFromList(selectedMonitorToken));
        } else toastWarning("Monitor is start or token is in use!!!");
      } else toastWarning("Select Monitor token");
    } else toastWarning("Create some account");
  };

  const handleSelectedChrome = (user) => {
    dispatch(setLOchromeUser(user));
  };

  const handleChromeMenuOpen = () => {
    if (chromeList.length === 0) {
      navigate(RoutePath.setting, { replace: true });
    }
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
          <UseAnimations
            animation={edit}
            strokeColor="#ffff"
            size={20}
            wrapperStyle={{ cursor: "pointer" }}
          />
          <span>Edit Account</span>
        </div>
        <div onClick={handleDeleteAccount} className="linkopener-acc btn">
          <UseAnimations
            animation={trash2}
            strokeColor="#B60E0E"
            size={20}
            wrapperStyle={{ cursor: "pointer", paddingBottom: "1px" }}
          />
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
          onMenuOpen={handleChromeMenuOpen}
          isSelect={true}
          selectOptions={chromeList}
          placeholderText={
            chromeList.length > 0 ? "Select Chrome User" : "Add Chrome User"
          }
          value={chromeList.filter((d) => d["id"] === selectedChrome?.id)}
        />
      </div>
      <AppSpacer spacer={35} />
    </div>
  );
}

export default Settings;
