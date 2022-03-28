import React from "react";
import { AppInputField, AppSpacer, LabelWithToolTip } from "../../../component";

function PasswordChnager() {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
        <div className="half-flex-field">
          <LabelWithToolTip labelText="Common Password (Optional)" />
          <AppInputField
            hideLabel={true}
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PasswordChnager;
