import React from "react";
import {
  AppInputField,
  AppSpacer,
  AppToggler,
  LabelWithToolTip,
} from "../../../component";

function MassGiveawayJoiner({
  onChange,
  selectToken,
  handleToggler,
  ...props
}) {
  console.log("true slide");
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper flex-col">
        <div className=" modal-flex-field-wrapper">
          <div style={{ width: "48%" }}>
            <AppInputField
              onChange={onChange}
              name="botid"
              fieldTitle="Enter Bot ID"
              placeholderText="Enter Bot ID"
            />
          </div>
          <div style={{ width: "49%" }}>
            <AppInputField
              onChange={onChange}
              name="serverid"
              fieldTitle="Enter Server ID"
              placeholderText="Enter Server ID"
            />
          </div>
        </div>
        <AppSpacer spacer={10} />
        <div className="d-flex">
          <div className="half-flex-field">
            <AppInputField
              {...props}
              name="delay"
              fieldTitle="Delay (Optional)"
              placeholderText="Enter Delay (in seconds)"
            />
          </div>
          <div className="half-flex-field gc-toggler">
            <AppSpacer spacer={3} />
            <LabelWithToolTip
              delayHide={1000}
              isCustomToolTip={true}
              labelText="Create Giveaway checker task"
            >
              <p className="custom-tooltip-text">
                Check for create task. which tell about who is the winner of
                giveaway.(Optional)
              </p>
            </LabelWithToolTip>
            <AppSpacer spacer={10} />
            <AppToggler onChange={handleToggler} name="creategc" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MassGiveawayJoiner;
