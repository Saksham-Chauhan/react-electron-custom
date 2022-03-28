import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

function MassInviteJoiner() {
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
      </div>
      <AppInputField
        isMulti={true}
        fieldTitle="Invite Codes[s]"
        placeholderText="Eg. 
      aJHGBDFDH
      ghJHGFGHF
      gKLDHGKLK"
      />
    </React.Fragment>
  );
}

export default MassInviteJoiner;
