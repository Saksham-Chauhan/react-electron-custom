import React from "react";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";
import "./style.css";

function ServerLeaver({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            name="delayInServerLeaver"
            {...props}
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
      </div>
      <AppSpacer spacer={20} />
      <div className="servre-leaver-toggler">
        <span>Server ID[s]</span>
        <span className="all">All</span>
        <AppToggler />
      </div>
      <AppInputField
        {...props}
        name="serverIDs"
        hideLabel={true}
        isMulti={true}
        multiHeight="100px"
        placeholderText="Eg. 
        936538800027467123
        936534767688678923
        936538800027467344"
      />
    </React.Fragment>
  );
}

export default ServerLeaver;
