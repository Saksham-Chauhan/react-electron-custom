import React from "react";
import { AppSpacer, LabelWithToolTip, AppInputField } from "../../../component";
import refresh from "../../../assests/images/refresh.svg";
import "./style.css";

function NicknameChanger() {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Server ID[s]"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
      </div>
      <AppSpacer spacer={20} />
      <div className="nickname-row">
        <LabelWithToolTip labelText="Nicknames" />
        <div className="group-title btn refresh">
          <img src={refresh} alt="ref" />
        </div>
      </div>
      <AppInputField
        hideLabel={true}
        isMulti={true}
        multiHeight="100px"
        placeholderText="Eg. 
      jack123
      jack234
      jack344"
      />
    </React.Fragment>
  );
}

export default NicknameChanger;
