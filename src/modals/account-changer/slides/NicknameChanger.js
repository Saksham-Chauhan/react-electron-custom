import React from "react";
import { AppSpacer, LabelWithToolTip, AppInputField } from "../../../component";

function NicknameChanger() {
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
          <AppInputField
            fieldTitle="Server ID[s]"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
      </div>
      <LabelWithToolTip labelText="Nicknames" />
      <AppInputField hideLabel={true} isMulti={true} multiHeight="100px" />
    </React.Fragment>
  );
}

export default NicknameChanger;
