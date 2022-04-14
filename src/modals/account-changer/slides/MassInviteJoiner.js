import React from "react";
import { AppInputField, AppSpacer } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";

function MassInviteJoiner({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
            name="delay"
            min={0}
            {...props}
            type="number"
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
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
