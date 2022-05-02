import React from "react";
import { useSelector } from "react-redux";
import { AppInputField, AppSpacer, LabelWithToolTip } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";
import { fetchClaimerGroupList } from "../../../features/counterSlice";
import { makeGroupOptions } from "../helper";

function LinkOpener({ handleMonitorToken, state, ...props }) {
  const claimerGroupList = useSelector(fetchClaimerGroupList);

  return (
    <React.Fragment>
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            // isSelect={true}
            isCustomSelect={true}
            onChange={handleMonitorToken}
            fieldTitle="Monitor Token"
            placeholderText="Enter Monitor token"
            selectOptions={makeGroupOptions(claimerGroupList)}
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Delay (in seconds)"
            name="delay"
            type="number"
            min={0}
            {...props}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            {...props}
            fieldTitle="Channel ID[s]"
            name="channelIDs"
            isMulti={true}
            multiHeight="100px"
            placeholderText={`Eg.
        936538800027467123
        936534767688678923
        936538800027467344`}
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <LabelWithToolTip
            toolTopText="Leave Blank For All Keywords"
            labelText="Keyword [s] (optional)"
            parentStyle={{ style: { marginBottom: "10px" } }}
          />
          <AppInputField
            {...props}
            hideLabel={true}
            name="keywords"
            isMulti={true}
            multiHeight="100px"
            placeholderText={`Eg.
        google
        koders
        walmart`}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
    </React.Fragment>
  );
}

export default LinkOpener;
