import React from "react";
import { AppInputField, AppSpacer, LabelWithToolTip } from "../../../component";
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
          <LabelWithToolTip
            toolTopText="This lets you select a server after entring monitor token."
            labelText="Server"
            parentStyle={{ style: { marginBottom: "10px" } }}
          />
          <AppInputField
            isSelect={true}
            name="serverIDs"
            hideLabel={true}
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
    </React.Fragment>
  );
}

export default InviteJoiner;
