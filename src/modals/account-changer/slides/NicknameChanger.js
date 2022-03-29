import React from "react";
import { AppSpacer, LabelWithToolTip, AppInputField } from "../../../component";
import refresh from "../../../assests/images/refresh.svg";
import "./style.css";

function NicknameChanger({ ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            name="delayInNickname"
            {...props}
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
        <div className="half-flex-field">
          <AppInputField
            {...props}
            fieldTitle="Server ID[s]"
            placeholderText="Eg. 936538800027467123"
            name="serverIDs"
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
        {...props}
        name="nicknameGenerate"
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
