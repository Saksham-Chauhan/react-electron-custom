import React from "react";
import { useSelector } from "react-redux";
import { AppInputField, AppSpacer } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";
import { fetchClaimerGroupList } from "../../../features/counterSlice";
import { makeGroupOptions } from "../helper";

const XPFarmer = ({ handleMonitorToken, state, onChange }) => {
  const claimerGroupList = useSelector(fetchClaimerGroupList);

  return (
    <div>
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            // isSelect={true}
            isCustomSelect={true}
            onChange={onChange}
            name="monitorToken"
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
            onChange={onChange}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
      <ModalFlexInnerRow>
        <AppInputField
          fieldTitle="Channel ID"
          placeholderText="Enter channel id."
          name="channelId"
          onChange={onChange}
        />
      </ModalFlexInnerRow>
    </div>
  );
};

export default XPFarmer;
