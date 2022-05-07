import React from "react";
import { AppInputField, AppSpacer, LabelWithToolTip } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";

function UserNameChanger({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in seconds)"
            name="delay"
            {...props}
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <LabelWithToolTip
            toolTopText="Leave blank for random usernames"
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
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
    </React.Fragment>
  );
}

export default UserNameChanger;
