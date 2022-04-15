import React from "react";
import { AppInputField, AppSpacer } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";

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
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
            name="delay"
            type="number"
            min={0}
            {...props}
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="API"
            placeholderText="Select API"
            selectOptions={api}
            isSelect={true}
            onChange={handleSelectAPI}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
    </React.Fragment>
  );
}

export default AvatarChanger;
