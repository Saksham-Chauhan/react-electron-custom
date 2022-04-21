import React from "react";
import { AppInputField, AppSpacer } from "../../../component";

function GiveawayJoiner({ selectToken, ...props }) {
  const { pageState } = props;
  const getTokensList = () => {
    let arr = pageState.claimerGroup.value.split("\n");
    let arrofTokens = [];
    for (let i = 0; i < arr.length; i++) {
      arrofTokens.push({
        label: arr[i].split(":")[3],
        value: arr[i].split(":")[3],
      });
    }
    return arrofTokens;
  };

  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper flex-col">
        <div className="half-flex-field">
          {Object.keys(pageState.claimerGroup).length && (
            <>
              <AppInputField
                fieldTitle="Select token"
                placeholderText="Add token"
                selectOptions={getTokensList()}
                isSelect={true}
                onChange={selectToken}
              />
              <AppSpacer spacer={10} />
            </>
          )}
        </div>
        <AppSpacer spacer={10} />
        <div className=" modal-flex-field-wrapper">
          <AppInputField
            {...props}
            name="botid"
            fieldTitle="Enter bot id"
            placeholderText="enter bot id"
          />
          <AppInputField
            {...props}
            name="serverid"
            fieldTitle="Enter server id"
            placeholderText="enter server id"
          />
        </div>
        <AppSpacer spacer={10} />
        <div className="half-flex-field">
          <AppInputField
            {...props}
            name="delay"
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default GiveawayJoiner;
