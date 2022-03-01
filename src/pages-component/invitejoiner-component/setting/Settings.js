import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { setModalState } from "../../../features/counterSlice";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";

function Settings() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setModalState("inviteJoinerSetting"));
  };

  return (
    <div>
      <AppSpacer spacer={30} />
      <div className="flex-btn-row">
        <div className="switch-with-text">
          <AppToggler />
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
            isSelect={true}
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
