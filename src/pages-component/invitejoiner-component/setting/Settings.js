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
  fetchLOSettingState,
  fetchIJMonitorState,
  fetchSelectedMinitorTokenLinkOpener,
  fetchSelectedClaimerTokenInviteJoiner,
} from "../../../features/counterSlice";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";
import {
  isValueInUse,
  getClaimerValue,
  makeClaimerSelectOption,
  makeProxyOptions,
} from "../../../helper";
import { toastWarning } from "../../../toaster";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import edit from "react-useanimations/lib/edit";
import { deleteAccountFromList } from "../../../features/logic/discord-account";
import { useNavigate } from "react-router-dom";
import {
  MAX_SAFE_DELAY_VALUE,
  MIN_SAFE_DELAY_VALUE,
  RoutePath,
} from "../../../constant";

function Settings({
  ijMonitorState,
  accountList,
  keywordList,
  selectedClaimerGroup,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const claimerList = useSelector(fetchClaimerGroupList);
  const proxyGroupList = useSelector(fetchProxyGroupList);
  const selectedProxyGroup = useSelector(fetchSelctedInviteProxyGroup);
  const safeDelayModeValue = useSelector(fetchSafeModeDelayState);
  const loMonitor = useSelector(fetchLOSettingState);
  const isMonitorStart = useSelector(fetchIJMonitorState);
  const selectedMonitorToken = useSelector(fetchSelectedMinitorTokenLinkOpener);
  const selectedToken = useSelector(fetchSelectedClaimerTokenInviteJoiner);

  const handleOpenModal = () => {
    dispatch(setModalState("inviteJoinerSetting"));
  };

  const handleClaimer = (data) => {
    dispatch(setSelectedClaimerGroup(data));
  };

  const handleIJmonitor = () => {
    if (accountList.length > 0) {
      if (Object.keys(selectedToken).length > 0) {
        if (Object.keys(selectedClaimerGroup).length > 0) {
          if (Object.keys(selectedProxyGroup).length > 0) {
            dispatch(toggleIJMonitor());
          } else toastWarning("Select Proxy Group");
        } else toastWarning("Select Token Group");
      } else toastWarning("Select Invite Joiner account");
    } else toastWarning("Create some Invite Joiner account");
  };

  /**
   * function handle edit account card state
   **/
  const handleEditAccount = () => {
    if (accountList.length > 0) {
      if (Object.keys(selectedToken).length > 0) {
        const result = isValueInUse(accountList, "id", selectedToken);
        if (!isMonitorStart && result) {
          if (selectedMonitorToken["id"] !== selectedToken["id"]) {
            dispatch(setEditStorage(selectedToken));
            dispatch(setModalState("discordAccount"));
          } else if (loMonitor?.linkOpenerState) {
            toastWarning("Account is use by link opener");
          } else {
            dispatch(setEditStorage(selectedToken));
            dispatch(setModalState("discordAccount"));
          }
        } else toastWarning("Monitor is start or token is in use!!");
      } else toastWarning("Select Monitor Token");
    } else toastWarning("Create some account");
  };

  /**
   * function handle delete account card state
   **/
  const handleDeleteAccount = () => {
    if (accountList.length > 0) {
      if (Object.keys(selectedToken).length > 0) {
        const result = isValueInUse(accountList, "id", selectedToken);
        if (!isMonitorStart && result) {
          if (selectedMonitorToken["id"] !== selectedToken["id"]) {
            dispatch(deleteAccountFromList(selectedToken));
          } else if (loMonitor?.linkOpenerState) {
            toastWarning("Account is use by link opener");
          } else dispatch(deleteAccountFromList(selectedToken));
        } else toastWarning("Monitor is start or token is in use!!!");
      } else toastWarning("Select Monitor Token");
    } else toastWarning("Create some account");
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

  const handleClaimerMenuOpen = () => {
    if (claimerList.length === 0) {
      navigate(RoutePath.setting, { replace: true });
    }
  };

  const handleProxyMenuOpen = () => {
    if (proxyGroupList.length === 0) {
      navigate(RoutePath.proxy, { replace: true });
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
          <span>{isMonitorStart ? "Stop" : "Start"} Invite Joiner</span>
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
            fieldTitle="Token Group"
            isCustomLabel={true}
            hideLabel={true}
            placeholderText={
              claimerList.length > 0 ? "Select Token Group" : "Add Token Group"
            }
            selectOptions={makeClaimerSelectOption(claimerList)}
            isSelect={true}
            onChange={handleClaimer}
            onMenuOpen={handleClaimerMenuOpen}
            value={getClaimerValue(claimerList, selectedClaimerGroup)}
          />
        </div>
        <div className="half-section">
          <AppInputField
            fieldTitle="Proxy Group"
            isCustomLabel={true}
            hideLabel={true}
            placeholderText={
              proxyGroupList.length > 0
                ? "Select Proxy Group"
                : "Add Proxy group"
            }
            isSelect={true}
            selectOptions={makeProxyOptions(proxyGroupList)}
            onChange={handleSelectProxyGroup}
            value={getProxyGroupValue()}
            onMenuOpen={handleProxyMenuOpen}
          />
        </div>
        <div className="half-section delay">
          <AppInputField
            fieldTitle="Delay"
            isCustomLabel={true}
            hideLabel={true}
            type="number"
            min={MIN_SAFE_DELAY_VALUE}
            max={MAX_SAFE_DELAY_VALUE}
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
