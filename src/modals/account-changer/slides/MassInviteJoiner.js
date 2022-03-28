import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

function MassInviteJoiner() {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField fieldTitle="Delay (Optional)" placeholderText="" />
        </div>
      </div>
      <AppInputField isMulti={true} fieldTitle="Invite Codes[s]" />
    </React.Fragment>
  );
}

export default MassInviteJoiner;
