import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

function AvatarChanger() {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField fieldTitle="Delay (Optional)" placeholderText="" />
        </div>
        <div className="half-flex-field">
          <AppInputField fieldTitle="API" placeholderText="" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AvatarChanger;
