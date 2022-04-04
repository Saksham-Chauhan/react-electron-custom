import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

const api = [
  {
    label: "Default API",
    value: "https://picsum.photos/v2/list",
    key: "defaultAPI",
  },
  {
    label: "Custom API",
    value: "https://picsum.photos/v2/list",
    key: "customAPI",
  },
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
            name="delay"
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
