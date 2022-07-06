import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

function GiveawayChecker({ onChange, selectToken, ...props }) {
  return (
    <React.Fragment>
      <AppSpacer spacer={5} />
      <div className="modal-flex-field-wrapper flex-col">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Monitor Token"
            placeholderText="Enter Token"
            onChange={onChange}
            name="token"
          />
        </div>
        <AppSpacer spacer={10} />
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
              {...props}
              name="delay"
              fieldTitle="Delay (Optional)"
              placeholderText="Enter Delay (in seconds)"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GiveawayChecker;
