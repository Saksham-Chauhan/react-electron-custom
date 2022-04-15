import React from "react";
import { AppInputField, AppSpacer, AppToggler } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";
import "./style.css";

function ServerLeaver({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            name="delay"
            {...props}
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>

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
        placeholderText={`Eg.
        936538800027467123
        936534767688678923
        936538800027467344`}
      />
    </React.Fragment>
  );
}

export default ServerLeaver;
