import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

function TokenChecker({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            {...props}
            name="delayInToken"
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TokenChecker;
