import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

function GiveawayJoiner({ selectToken, ...props }) {
  const { pageState } = props;
  // const getTokensList = () => {
  //   let arr = pageState.claimerGroup.value.split("\n");
  //   let arrofTokens = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     arrofTokens.push({
  //       label: arr[i].split(":")[2],
  //       value: arr[i].split(":")[2],
  //     });
  //   }
  //   return arrofTokens;
  // };

  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper flex-col">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Monitor Token"
            placeholderText="Enter Token"
            // selectOptions={getTokensList()}
            // isSelect={true}
            onChange={selectToken}
          />
        </div>
        <AppSpacer spacer={10} />
        <div className=" modal-flex-field-wrapper">
          <div style={{ width: "48%" }}>
            <AppInputField
              {...props}
              name="botid"
              fieldTitle="Enter Bot Id"
              placeholderText="Enter Bot Id"
            />
          </div>
          <div style={{ width: "49%" }}>
            <AppInputField
              {...props}
              name="serverid"
              fieldTitle="Enter Server Id"
              placeholderText="Enter Server Id"
            />
          </div>
        </div>
        <AppSpacer spacer={10} />
        <div className="half-flex-field">
          <AppInputField
            {...props}
            name="delay"
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in seconds)"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default GiveawayJoiner;
