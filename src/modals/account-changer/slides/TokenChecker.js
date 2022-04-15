import React from "react";
import { AppInputField, AppSpacer } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";

function TokenChecker({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            {...props}
            name="delayInToken"
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
    </React.Fragment>
  );
}

export default TokenChecker;
