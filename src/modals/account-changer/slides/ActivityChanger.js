import { Picker } from "emoji-mart";
import React from "react";
import { AppInputField, AppSpacer } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";
import { statusList } from "../../../constant";

function ActivityChanger({
  handleIsEmoji,
  state,
  handleUpdateObject,
  handleSelectStatus,
  ...props
}) {
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emojival = String.fromCodePoint(...codesArray);
    console.log(emojival);
    handleUpdateObject("emojiValue", emojival);
  };
  return (
    <React.Fragment>
      {state.emoji && (
        <div className="emoji-tray-picker">
          <Picker onSelect={addEmoji} />
        </div>
      )}
      <ModalFlexOuterRow>
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
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Status"
            placeholderText="Select status"
            name="status"
            isSelect={true}
            selectOptions={statusList}
            onChange={handleSelectStatus}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Emoji"
            placeholderText="Enter Emoji"
            onClick={(e) => {
              e.stopPropagation();
              handleIsEmoji(!state.emoji);
            }}
            name="emojiValue"
            value={state.emojiValue}
            {...props}
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Status Details"
            placeholderText="Eg. Playing Kyro Tools"
            name="activityDetails"
            {...props}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
    </React.Fragment>
  );
}

export default ActivityChanger;
