import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

const api = [
  { label: "Default API", value: "defaultAPI" },
  { label: "Custom API", value: "customAPI" },
];

function AvatarChanger({ handleSelectAPI, ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
            name="delayInAvatar"
            type="number"
            min={0}
            {...props}
          />
        </div>
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="API"
            placeholderText="Select API"
            selectOptions={api}
            isSelect={true}
            onChange={handleSelectAPI}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AvatarChanger;
