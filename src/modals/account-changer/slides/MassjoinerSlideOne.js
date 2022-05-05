import React from "react";
import { useSelector } from "react-redux";
import {
  AppInputField,
  AppSpacer,
  AppToggler,
  LabelWithToolTip,
} from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";
import { fetchThemsState } from "../../../features/counterSlice";

const MassjoinerSlideOne = ({ onChange, handleToggler, pageState }) => {
  const appTheme = useSelector(fetchThemsState);
  const textClass = appTheme ? "lightMode_color" : "";
  return (
    <>
      <div className="mj-slide">
        <ModalFlexOuterRow>
          <ModalFlexInnerRow>
            <AppInputField
              fieldTitle="Delay (Optional)"
              placeholderText="Enter Delay (in seconds)"
              name="delay"
              min={0}
              onChange={onChange}
              type="number"
            />
          </ModalFlexInnerRow>
        </ModalFlexOuterRow>
        <AppSpacer spacer={10} />
        <AppInputField
          isMulti={true}
          name="inviteCodes"
          multiHeight="85px"
          onChange={onChange}
          fieldTitle="Invite Codes[s]"
          placeholderText="Eg. 
      aJHGBDFDH
      ghJHGFGHF
      gKLDHGKLK"
        />
        <div className="d-flex toogler-group-dj">
          <div className="toggler-btn-label">
            <label className={textClass}>React</label>
            <AppSpacer spacer={5} />
            <div className="d-flex toggler-slide-one">
              <AppToggler
                id="invite-joiner-react-setting-mode"
                checked={pageState.isReact}
                onChange={handleToggler}
                name="isReact"
              />
              <label className={textClass}>
                Turn {pageState.isReact ? "ON" : "OFF"}
              </label>
            </div>
          </div>
          <div className="toggler-btn-label joiner-custom-input">
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
            <AppSpacer spacer={5} />
            <div className="d-flex toggler-slide-one">
              <AppToggler
                id="invite-joiner-accept-rule"
                checked={pageState.isAcceptRule}
                onChange={handleToggler}
                name="isAcceptRule"
              />
              <label className={textClass}>
                Turn {pageState.isAcceptRule ? "ON" : "OFF"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MassjoinerSlideOne;
