import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalState,
  setEditStorage,
  toggleIJMonitor,
  fetchProxyGroupList,
  setInviteProxyGroup,
  setInviteJoinerDelay,
  fetchClaimerGroupList,
  fetchSafeModeDelayState,
  setSelectedClaimerGroup,
  fetchSelctedInviteProxyGroup,
} from "../../../features/counterSlice";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";
import {
  isValueInUse,
  getClaimerValue,
  makeClaimerSelectOption,
} from "../../../helper";
import { toastWarning } from "../../../toaster";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import edit from "react-useanimations/lib/edit";
import { deleteAccountFromList } from "../../../features/logic/discord-account";

const MIN_SAFE_DELAY_VALUE = 0;
const MAX_SAFE_DELAY_VALUE = 10 * 1000;

function Settings({
  ijMonitorState,
  accountList,
  keywordList,
  selectedToken,
  isMonitorStart,
  selectedClaimerGroup,
}) {
  const dispatch = useDispatch();
  const claimerList = useSelector(fetchClaimerGroupList);
  const proxyGroupList = useSelector(fetchProxyGroupList);
  const selectedProxyGroup = useSelector(fetchSelctedInviteProxyGroup);
  const safeDelayModeValue = useSelector(fetchSafeModeDelayState);

  const handleOpenModal = () => {
    dispatch(setModalState("inviteJoinerSetting"));
  };

  const handleClaimer = (data) => {
    dispatch(setSelectedClaimerGroup(data));
  };

  const handleIJmonitor = () => {
    if (accountList.length > 0) {
      if (Object.keys(selectedToken).length > 0) {
        if (keywordList.length > 0) {
          if (Object.keys(selectedClaimerGroup).length > 0) {
            if (Object.keys(selectedProxyGroup).length > 0) {
              dispatch(toggleIJMonitor());
            } else toastWarning("Select proxy group");
          } else toastWarning("Select claimer group");
        } else toastWarning("Enter some channel to monitor");
      } else toastWarning("Select Invite joiner account");
    } else toastWarning("Create some Invite joiner account");
  };

  /**
   * function handle edit account card state
   **/
  const handleEditAccount = () => {
    if (accountList.length > 0) {
      if (Object.keys(selectedToken).length > 0) {
        const result = isValueInUse(accountList, "discordToken", selectedToken);
        if (!result && !isMonitorStart) {
          dispatch(setEditStorage(selectedToken));
          dispatch(setModalState("discordAccount"));
        } else toastWarning("Token in use!!");
      } else toastWarning("Select Monitor token");
    } else toastWarning("Create some account");
  };

  /**
   * function handle delete account card state
   **/
  const handleDeleteAccount = () => {
    if (accountList.length > 0) {
      if (Object.keys(selectedToken).length > 0) {
        const result = isValueInUse(accountList, "discordToken", selectedToken);
        if (!result && !isMonitorStart) {
          dispatch(deleteAccountFromList(selectedToken));
        } else toastWarning("Token in use!!");
      } else toastWarning("Select Monitor token");
    } else toastWarning("Create some account");
  };

  /**
   * function make option for select
   */
  const makeProxyOptions = () => {
    if (proxyGroupList.length > 0) {
      const result = proxyGroupList.map((group) => {
        let obj = {};
        obj["label"] = group["groupName"];
        obj["value"] = group["proxies"];
        obj["id"] = group["id"];
        return obj;
      });
      return result;
    } else return [];
  };

  const handleSelectProxyGroup = (group) => {
    if (Object.keys(group).length > 0) {
      dispatch(setInviteProxyGroup(group));
    }
  };

  const getProxyGroupValue = () => {
    if (Object.keys(selectedProxyGroup).length > 0) {
      const result = proxyGroupList.filter(
        (group) => group["id"] === selectedProxyGroup["id"]
      );
      if (result.length > 0) {
        return [
          {
            label: result[0]["groupName"],
            value: result[0]["proxies"],
            id: result[0]["id"],
          },
        ];
      }
    }
    return [];
  };

  const handleDelayChange = (e) => {
    const { value } = e.target;
    const numValue = parseInt(value);
    if (
      (numValue > MIN_SAFE_DELAY_VALUE && numValue <= MAX_SAFE_DELAY_VALUE) ||
      value === ""
    ) {
      dispatch(setInviteJoinerDelay(value));
    }
  };

  return (
    <div>
      <AppSpacer spacer={30} />
      <div className="flex-btn-row">
        <div className="switch-with-text">
          <AppToggler
            onChange={handleIJmonitor}
            checked={ijMonitorState}
            id="invite-joiner-monitor-toggle"
          />
          <span>Stop Auto Invite Joiner</span>
        </div>
        <div
          onClick={handleOpenModal}
          className="switch-with-text with-no-toggle btn"
        >
          <span>Direct Join</span>
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
      <div className="claimer-token-setting-section">
        <div className="half-section">
          <AppInputField
            fieldTitle="Claimer Token"
            isCustomLabel={true}
            hideLabel={true}
            placeholderText="Select Token"
            selectOptions={makeClaimerSelectOption(claimerList)}
            isSelect={true}
            onChange={handleClaimer}
            value={getClaimerValue(claimerList, selectedClaimerGroup)}
          />
        </div>
        <div className="half-section">
          <AppInputField
            fieldTitle="Proxy Group"
            isCustomLabel={true}
            hideLabel={true}
            placeholderText="Select Proxy Group"
            isSelect={true}
            selectOptions={makeProxyOptions()}
            onChange={handleSelectProxyGroup}
            value={getProxyGroupValue()}
          />
        </div>
        <div className="linkopener">
          <AppInputField
            fieldTitle="Delay"
            isCustomLabel={true}
            hideLabel={true}
            type="number"
            min={0}
            max={10 * 1000}
            placeholderText="Enter Delay"
            onChange={handleDelayChange}
            value={safeDelayModeValue === 0 ? "" : safeDelayModeValue}
          />
        </div>
      </div>
      <AppSpacer spacer={30} />
    </div>
  );
}

export default Settings;
