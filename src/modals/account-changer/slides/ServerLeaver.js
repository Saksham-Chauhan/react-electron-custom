import React from "react";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";

function ServerLeaver() {
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
      <div className="servre-leaver-toggler">
        <span>Server ID[s]</span>
        <span>All</span>
        <AppToggler />
      </div>
      <AppInputField hideLabel={true} isMulti={true} multiHeight="100px" />
    </React.Fragment>
  );
}

export default ServerLeaver;
