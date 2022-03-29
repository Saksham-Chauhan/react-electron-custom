import React from "react";
import { AppInputField, AppSpacer, LabelWithToolTip } from "../../../component";

function UserNameChanger({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
            name="delayInUser"
            {...props}
          />
        </div>
        <div className="half-flex-field">
          <LabelWithToolTip
            labelText="Username (Optional)"
            parentStyle={{ style: { marginBottom: "10px" } }}
          />
          <AppInputField
            hideLabel={true}
            fieldTitle=""
            placeholderText="Enter Username"
            name="username"
            {...props}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserNameChanger;
