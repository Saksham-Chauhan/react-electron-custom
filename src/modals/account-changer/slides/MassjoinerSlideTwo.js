import React from "react";
import {
  AppInputField,
  AppSpacer,
  AppToggler,
  LabelWithToolTip,
} from "../../../component";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const MassjoinerSlideTwo = ({
  onChange,
  handleToggler,
  pageState,
  handleIsEmoji,
  handleUpdateObject,
}) => {
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emojival = String.fromCodePoint(...codesArray);
    handleUpdateObject("emojiValue", emojival);
  };

  return (
    <>
      <div className="mj-slide">
        {pageState.emoji && (
          <div className="emoji-tray-picker">
            <Picker onSelect={addEmoji} />
          </div>
        )}
        {true && (
          <>
            <div className="toggler-btn-label">
              <label>React</label>
              <AppSpacer spacer={5} />
              <div className="d-flex custom-toggler-btn">
                <AppToggler
                  id="invite-joiner-react-setting-mode"
                  checked={pageState.isReact}
                  onChange={handleToggler}
                  name="isReact"
                />
                <label>Turn {pageState.isReact ? "ON" : "OFF"}</label>
              </div>
            </div>
            <div className="d-flex react-fields">
              {pageState.isReact && (
                <>
                  <div>
                    <AppInputField
                      fieldTitle="Channel ID"
                      placeholderText="Enter Channel ID"
                      onChange={onChange}
                      name="channelId"
                    />
                  </div>
                  <div>
                    <AppInputField
                      fieldTitle="Message ID"
                      onChange={onChange}
                      name="messageId"
                      placeholderText="Enter Message ID"
                    />
                  </div>
                  <div className="emoji-picker-wrapper">
                    <AppInputField
                      fieldTitle="Emoji"
                      placeholderText="Enter Emoji"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIsEmoji(!pageState.emoji);
                      }}
                      name="emojiValue"
                      value={pageState.emojiValue}
                      onChange={onChange}
                    />
                  </div>
                </>
              )}
            </div>
            <AppSpacer spacer={10} />
            <div className="toggler-btn-label">
              <LabelWithToolTip
                delayHide={1500}
                isCustomToolTip={true}
                labelText="Accept Rules"
              >
                <p className="custom-tooltip-text">Accept Format</p>
                <p
                  className="custom-tooltip-text link"
                  onClick={() =>
                    window.open(
                      "https://guide.kyrotools.in/#/ExampleForReactOnDirectInvite"
                    )
                  }
                >
                  For more
                </p>
              </LabelWithToolTip>
              <AppSpacer spacer={10} />
              <div className="d-flex custom-toggler-btn">
                <AppToggler
                  id="invite-joiner-accept-rule"
                  checked={pageState.isAcceptRule}
                  onChange={handleToggler}
                  name="isAcceptRule"
                />
                <label>Turn {pageState.isAcceptRule ? "ON" : "OFF"}</label>
              </div>
              <AppSpacer spacer={10} />
              {pageState.isAcceptRule && (
                <div className={`accept-joiner-setting-section `}>
                  <AppInputField
                    isMulti={true}
                    multiHeight="80px"
                    fieldTitle="Accept Format"
                    name="rules"
                    onChange={onChange}
                    placeholderText="Enter Accept Format"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MassjoinerSlideTwo;
