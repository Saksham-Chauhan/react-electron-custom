import React from "react";
import { AppInputField, AppSpacer } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";

function InviteJoiner({
  handleSelectChannel,
  handleSelectServer,
  state,
  ...props
}) {
  return (
    <React.Fragment>
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            {...props}
            name="monitorToken"
            fieldTitle="Monitor Token"
            placeholderText="Enter Monitor token"
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
      <AppSpacer spacer={15} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            isSelect={true}
            name="serverIDs"
            fieldTitle="Server"
            placeholderText="Select Server"
            onChange={handleSelectServer}
            selectOptions={state.serverIDs}
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            isSelect={true}
            isMulti={true}
            fieldTitle="Channel[s]"
            placeholderText="Select Channels"
            name="channelIDs"
            onChange={handleSelectChannel}
            selectOptions={state.channels}
            autoClose={false}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      {/* <AppSpacer spacer={10} />
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
      /> */}
    </React.Fragment>
  );
}

export default InviteJoiner;
