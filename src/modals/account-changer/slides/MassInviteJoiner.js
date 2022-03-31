import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

function MassInviteJoiner({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
            name="delay"
            min={0}
            {...props}
            type="number"
          />
        </div>
      </div>
      <AppInputField
        isMulti={true}
        name="inviteCodes"
        {...props}
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
