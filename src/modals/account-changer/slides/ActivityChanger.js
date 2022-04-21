import React from "react";
import { AppInputField, AppSpacer } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";

function ActivityChanger({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Delay (Optional)"
            name="delay"
            type="number"
            min={0}
            {...props}
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Activity Details"
            placeholderText="Eg. Playing Kyro Tools"
            name="activityDetails"
            {...props}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
    </React.Fragment>
  );
}

export default ActivityChanger;
