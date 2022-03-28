import React from "react";
import {
  AppInputField,
  AppSidebar,
  AppSpacer,
  LabelWithToolTip,
} from "../../../component";

function UserNameChanger() {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField fieldTitle="Proxy Group" placeholderText="" />
        </div>
        <div className="half-flex-field">
          <LabelWithToolTip
            labelText="Username (Optional)"
            parentStyle={{ style: { marginBottom: "10px" } }}
          />
          <AppInputField hideLabel={true} fieldTitle="" placeholderText="" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserNameChanger;
