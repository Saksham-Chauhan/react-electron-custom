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
import { toastWarning, toastSuccess } from "../../toaster";
import { channelRegexExp } from "../../constant/regex";
import {
  discordServerAcceptRuleAPI,
  discordServerInviteAPI,
  discordServerInviteReactAPI,
} from "../../api";

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
      guildID: "",
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
      if (/^[0-9]+$/.test(setting.acceptRule.guildID)) {
        valid = true;
      } else {
        valid = false;
        toastWarning("Enter valid Guild Id");
        return valid;
      }
      try {
        const isJson = JSON.stringify(setting.acceptRule.acceptRuleValue);
        JSON.parse(isJson);
        valid = true;
      } catch (error) {
        valid = false;
        toastWarning("Enter Accept riule in JSON");
        return valid;
      }
    }
    return valid;
  };

  const handleCloseModal = () => {
    dispatch(setModalState("inviteJoinerSetting"));
  };

  const handleReactChange = (e) => {
    e.preventDefault();
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
    e.preventDefault();
    const { value } = e.target;
    setSetting((pre) => {
      return { ...pre, inviteCode: value };
    });
  };

  const handleAcceptRuleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSetting((pre) => {
      return {
        ...pre,
        acceptRule: { ...pre.acceptRule, acceptRuleValue: value },
      };
    });
  };

  const handleGuildChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSetting((pre) => {
      return { ...pre, acceptRule: { ...pre.acceptRule, guildID: value } };
    });
  };

  // TODO => Prettify this code
  const handleSubmit = () => {
    const result = checkValidation();
    if (result) {
      const claimerArr = selectedClaimerGroup["value"]?.split("\n");
      claimerArr.forEach(async (token) => {
        const proxyArr = selectedProxyGroup["value"]?.split("\n");
        for (let index = 0; index < proxyArr.length; index++) {
          let proxySplit = proxyArr[index]?.split(":");
          const proxy = {
            host: proxySplit[0],
            port: proxySplit[1],
            auth: {
              username: proxySplit[2],
              password: proxySplit[3],
            },
          };
          const inviteRespose = await discordServerInviteAPI(
            setting.inviteCode,
            token,
            proxy
          );
          if (inviteRespose.status === 200) {
            if (index > claimerArr.length) break;
            toastSuccess(`Joined the ${inviteRespose.data.guild.name} server`);
            if (setting.isReact) {
              const response = await discordServerInviteReactAPI(
                selectedProxyGroup,
                setting.reactSetting.channelId,
                setting.reactSetting.messageId,
                setting.reactSetting.emojiHexValue,
                token
              );
              if (response !== null) {
                if (response.status === 201) {
                  toastSuccess("Reacted to the server");
                }
              }
            }
          }

          if (setting.isAcceptRule) {
            const response = await discordServerAcceptRuleAPI(
              setting.acceptRule.guildID,
              token,
              setting.acceptRule.acceptRuleValue,
              setting.inviteCode,
              selectedProxyGroup
            );
            if (response !== null) {
              if (response.status === 201) {
                toastSuccess("Accept the rule");
              }
            }
          }
        }
      });
      handleCloseModal();
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
          onCopy={handleInviteChange}
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
                onCopy={handleReactChange}
                name="channelId"
                value={setting.reactSetting.channelId}
              />
            </div>
            <div>
              <AppInputField
                fieldTitle="Message ID"
                onChange={handleReactChange}
                onCopy={handleReactChange}
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
                onCopy={handleReactChange}
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
              placeholderText="Enter guild ID"
              fieldTitle="Guild ID"
              value={setting.acceptRule.guildID}
              onChange={handleGuildChange}
              onCopy={handleGuildChange}
            />
            <AppSpacer spacer={10} />
            <AppInputField
              isMulti={true}
              multiHeight="100px"
              fieldTitle="Accept Format"
              onCopy={handleAcceptRuleChange}
              onChange={handleAcceptRuleChange}
              placeholderText="Enter Accept Format"
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
