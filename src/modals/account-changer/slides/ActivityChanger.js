import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

function ActivityChanger({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Delay (Optional)"
            name="delay"
            type="number"
            min={0}
            {...props}
          />
        </div>
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Activity Details"
            placeholderText="Eg. Playing Kyro Tools"
            name="activityDetails"
            {...props}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ActivityChanger;
