import React from "react";
import { AppSpacer } from "../../component";
import "./styles.css";

function NoAccountAlert({ buttonText = "", modalTitle = "", buttonPress }) {
  return (
    <div className="no-account-modal-wrapper">
      <div className="mo-account--modal-inner">
        <div className="no-account-modal-title">
          <h2>{modalTitle}</h2>
        </div>
        <AppSpacer spacer={30} />
        <div onClick={buttonPress} className="no-account-modal-btn">
          <span>{buttonText}</span>
        </div>
      </div>
    </div>
  );
}

export default NoAccountAlert;
