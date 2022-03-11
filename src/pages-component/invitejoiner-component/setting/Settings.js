import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClaimerGroupList,
  fetchSelectedClaimerTokenInviteJoiner,
  setModalState,
  setSelectedClaimerTokenIJ,
  toggleIJMonitor,
} from "../../../features/counterSlice";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";
import { getClaimerValue, makeClaimerSelectOption } from "../../../helper";
import { toastWarning } from "../../../toaster";

function Settings({
  ijMonitorState,
  tempStorage,
  claimerAccountList,
  keywordList,
}) {
  const dispatch = useDispatch();
  const claimerList = useSelector(fetchClaimerGroupList);
  const selectedToken = useSelector(fetchSelectedClaimerTokenInviteJoiner);

  const handleOpenModal = () => {
    dispatch(setModalState("inviteJoinerSetting"));
  };

  const handleClaimer = (data) => {
    dispatch(setSelectedClaimerTokenIJ(data));
  };

  const handleIJmonitor = () => {
    if (claimerAccountList.length > 0) {
      if (Object.keys(tempStorage).length > 0) {
        if (keywordList.length > 0) {
          dispatch(toggleIJMonitor());
        } else toastWarning("Enter some channel to monitor");
      } else toastWarning("Select Invite joiner account");
    } else toastWarning("Create some Invite joiner account");
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
            value={getClaimerValue(claimerList, selectedToken)}
          />
        </div>
        <div className="half-section">
          <AppInputField
            fieldTitle="Delay"
            isCustomLabel={true}
            hideLabel={true}
            placeholderText=""
          />
        </div>
        <div className="linkopener-urlappender-btn btn">
          <span>Off Safe Mode</span>
        </div>
      </div>
      <AppSpacer spacer={30} />
    </div>
  );
}

export default Settings;
