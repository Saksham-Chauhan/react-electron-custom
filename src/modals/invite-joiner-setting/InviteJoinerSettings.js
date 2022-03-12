import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AppSpacer,
  AppToggler,
  ModalWrapper,
  AppInputField,
  LabelWithToolTip,
} from "../../component";
import {
  fetchSelctedInviteProxyGroup,
  fetchSelectedClaimerGroupState,
  setModalState,
} from "../../features/counterSlice";
import { toastWarning } from "../../toaster";
import { channelRegexExp } from "../../constant/regex";
import { discordServerInviteReactAPI } from "../../api";
function InviteJoinerSettings() {
  const dispatch = useDispatch();
  const selectedProxyGroup = useSelector(fetchSelctedInviteProxyGroup);
  const selectedClaimerGroup = useSelector(fetchSelectedClaimerGroupState);
  const [setting, setSetting] = useState({
    inviteCode: "",
    isReact: false,
    reactSetting: {
      channelId: "",
      messageId: "",
      emojiHexValue: "",
    },
    isAcceptRule: false,
    acceptRule: {
      acceptRuleValue: "",
    },
  });

  const checkValidation = () => {
    let valid;
    if (/.+[a-z|A-Z|0-9]/.test(setting.inviteCode)) {
      valid = true;
    } else {
      valid = false;
      toastWarning("Enter valid invite code");
      return valid;
    }
    if (setting.isReact) {
      if (channelRegexExp.test(setting.reactSetting.channelId)) {
        valid = true;
      } else {
        valid = false;
        toastWarning("Enter valid Channel Id");
        return valid;
      }
      if (channelRegexExp.test(setting.reactSetting.messageId)) {
        valid = true;
      } else {
        valid = false;
        toastWarning("Enter valid Message Id");
        return valid;
      }
      if (
        /\p{Extended_Pictographic}/u.test(setting.reactSetting.emojiHexValue)
      ) {
        valid = true;
      } else {
        valid = false;
        toastWarning("Enter valid emoji");
        return valid;
      }
    }
    if (setting.isAcceptRule) {
    }
    return valid;
  };

  const handleCloseModal = () => {
    dispatch(setModalState("inviteJoinerSetting"));
  };

  const handleReactChange = (e) => {
    const { value, name } = e.target;
    setSetting((pre) => {
      return { ...pre, reactSetting: { ...pre.reactSetting, [name]: value } };
    });
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setSetting((pre) => {
      return { ...pre, [name]: checked };
    });
  };

  const handleInviteChange = (e) => {
    const { value } = e.target;
    setSetting((pre) => {
      return { ...pre, inviteCode: value };
    });
  };

  const handleAcceptRuleChange = (e) => {
    const { value } = e.target;
    setSetting((pre) => {
      return { ...pre, acceptRule: { acceptRuleValue: value } };
    });
  };

  const handleSubmit = () => {
    const result = checkValidation();
    if (result) {
      const claimerArr = selectedClaimerGroup["value"].split("\n");
      claimerArr.forEach(async (token) => {
        const response = await discordServerInviteReactAPI(
          selectedProxyGroup,
          setting.reactSetting.channelId,
          setting.reactSetting.messageId,
          setting.reactSetting.emojiHexValue,
          token
        );
        if (response !== null) {
          console.log(response);
        }
      });
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Invite Joiner</h2>
      </div>
      <AppSpacer spacer={30} />
      <div className="joiner-custom-input">
        <LabelWithToolTip labelText="Invite Code" />
        <AppInputField
          onChange={handleInviteChange}
          placeholderText="Enter Invite Code"
          hideLabel={true}
          value={setting.inviteCode}
        />
      </div>
      <AppSpacer spacer={20} />
      <div className="joiner-custom-input">
        <LabelWithToolTip labelText="React" />
        <AppSpacer spacer={5} />
        <div className="joiner-custom-toggle">
          <AppToggler
            id="invite-joiner-react-setting-mode"
            checked={setting.isReact}
            onChange={handleToggle}
            name="isReact"
          />
          <label>Turn {!setting.isReact ? "ON" : "OFF"}</label>
        </div>
        <AppSpacer spacer={10} />
        {setting.isReact && (
          <div className={`react-joiner-setting-section `}>
            <div>
              <AppInputField
                fieldTitle="Channel ID"
                placeholderText="Enter Channel ID"
                onChange={handleReactChange}
                name="channelId"
                value={setting.reactSetting.channelId}
              />
            </div>
            <div>
              <AppInputField
                fieldTitle="Message ID"
                onChange={handleReactChange}
                name="messageId"
                value={setting.reactSetting.messageId}
                placeholderText="Enter Message ID"
              />
            </div>
            <div>
              <AppInputField
                fieldTitle="Emoji"
                placeholderText="Enter Emoji"
                onChange={handleReactChange}
                name="emojiHexValue"
                value={setting.reactSetting.emojiHexValue}
              />
            </div>
          </div>
        )}
      </div>
      <AppSpacer spacer={20} />
      <div className="joiner-custom-input">
        <LabelWithToolTip labelText="Accept Rules" />
        <AppSpacer spacer={5} />
        <div className="joiner-custom-toggle">
          <AppToggler
            id="invite-joiner-accept-rule"
            checked={setting.isAcceptRule}
            onChange={handleToggle}
            name="isAcceptRule"
          />
          <label>Turn {!setting.isAcceptRule ? "ON" : "OFF"}</label>
        </div>
        <AppSpacer spacer={10} />
        {setting.isAcceptRule && (
          <div className={`accept-joiner-setting-section `}>
            <AppInputField
              onChange={handleAcceptRuleChange}
              isMulti={true}
              multiHeight="100px"
              placeholderText="Enter Accept Format"
              fieldTitle="Accept Format"
              value={setting.acceptRule.acceptRuleValue}
            />
          </div>
        )}
      </div>
      <AppSpacer spacer={30} />
      <div className="modal-control-btns">
        <div onClick={handleCloseModal} className="modal-cancel-btn btn">
          <span>Cancel</span>
        </div>
        <div onClick={handleSubmit} className="modal-cancel-btn submit btn">
          <span>Join</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default InviteJoinerSettings;
