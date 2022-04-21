import React from "react";
import { useSelector } from "react-redux";
import { AppInputField } from "../../../component";
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
            isSelect={true}
            isCustomSelect={true}
            onChange={handleMonitorToken}
            fieldTitle="Monitor Token"
            placeholderText="Select Monitor token"
            selectOptions={makeGroupOptions(claimerGroupList)}
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Delay (Optional)"
            name="delay"
            type="number"
            min={0}
            onChange={onChange}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
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
