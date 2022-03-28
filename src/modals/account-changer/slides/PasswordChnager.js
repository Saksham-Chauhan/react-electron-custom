import React from "react";
import { AppInputField, AppSpacer, LabelWithToolTip } from "../../../component";

function PasswordChnager({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
            {...props}
            name="delayInPassword"
          />
        </div>
        <div className="half-flex-field">
          <LabelWithToolTip labelText="Common Password (Optional)" />
          <AppInputField
            {...props}
            name="commonPassword"
            hideLabel={true}
            placeholderText="Leave Blank For Randomize"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PasswordChnager;
