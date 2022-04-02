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
  fetchClaimerGroupList,
  fetchProxyGroupList,
  fetchSafeModeDelayState,
  fetchSelctedInviteProxyGroup,
  fetchSelectedClaimerGroupState,
  setModalState,
} from "../../features/counterSlice";
import { toastWarning } from "../../toaster";
import { channelRegexExp } from "../../constant/regex";
import { directDiscordJoinAPI } from "../../api";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import {
  getClaimerValue,
  makeClaimerSelectOption,
  makeProxyOptions,
} from "../../helper";
import { useNavigate } from "react-router-dom";
import {
  MAX_SAFE_DELAY_VALUE,
  MIN_SAFE_DELAY_VALUE,
  RoutePath,
} from "../../constant";

function InviteJoinerSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedProxyGroup = useSelector(fetchSelctedInviteProxyGroup);
  const selectedClaimerGroup = useSelector(fetchSelectedClaimerGroupState);
  const claimerList = useSelector(fetchClaimerGroupList);
  const proxyGroupList = useSelector(fetchProxyGroupList);
  const safeDelayModeValue = useSelector(fetchSafeModeDelayState);
  const [isEmoji, setIsEmoji] = useState(false);
  const [setting, setSetting] = useState({
    inviteCode: "",
    isReact: false,
    reactSetting: {
      channelId: "",
      messageId: "",
      emojiValue: "",
    },
    isAcceptRule: false,
    acceptRule: {
      acceptRuleValue: "",
      guildID: "",
    },
    proxyGroup: {},
    claimerGroup: {},
    safeDelay: 0,
  });

  React.useEffect(() => {
    if (selectedClaimerGroup || selectedClaimerGroup || safeDelayModeValue) {
      setSetting((pre) => {
        return {
          ...pre,
          claimerGroup: selectedClaimerGroup,
          proxyGroup: selectedProxyGroup,
          safeDelay: safeDelayModeValue,
        };
      });
    }
  }, [selectedClaimerGroup, selectedProxyGroup, safeDelayModeValue]);

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
    const { value, name } = e.target;
    setSetting((pre) => {
      return { ...pre, reactSetting: { ...pre.reactSetting, [name]: value } };
    });
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked);
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

  const handleEmojiState = () => {
    setIsEmoji(!isEmoji);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setSetting((pre) => {
      return {
        ...pre,
        reactSetting: { ...pre.reactSetting, emojiValue: emoji },
      };
    });
    handleEmojiState();
  };

  const handleSubmit = () => {
    console.log(setting);
    // const result = checkValidation();
    // if (result) {
    //   const claimerArr = selectedClaimerGroup["value"]?.split("\n");
    //   claimerArr.forEach(async (token) => {
    //     const response = await directDiscordJoinAPI(
    //       setting.proxyGroup,
    //       setting.inviteCode,
    //       token,
    //       setting
    //     );
    //     if (response === null) {
    //       toastWarning("Something went wrong 🥲");
    //     }
    //   });
    //   handleCloseModal();
    // }
  };

  const handleClaimerMenuOpen = () => {
    if (claimerList.length === 0) {
      navigate(RoutePath.setting, { replace: true });
      handleCloseModal();
    }
  };

  const handleClaimer = (data) => {
    setSetting((pre) => {
      return { ...pre, claimerGroup: data };
    });
  };

  const handleSelectProxyGroup = (group) => {
    if (Object.keys(group).length > 0) {
      setSetting((pre) => {
        return { ...pre, proxyGroup: group };
      });
    }
  };

  const getProxyGroupValue = () => {
    if (Object.keys(setting.proxyGroup).length > 0) {
      const result = proxyGroupList.filter(
        (group) => group["id"] === setting.proxyGroup["id"]
      );
      if (result.length > 0) {
        return [
          {
            label: result[0]["groupName"],
            value: result[0]["proxies"],
            id: result[0]["id"],
          },
        ];
      }
    } else return [];
  };

  const handleProxyMenuOpen = () => {
    if (proxyGroupList.length === 0) {
      navigate(RoutePath.proxy, { replace: true });
      handleCloseModal();
    }
  };

  const handleDelayChange = (e) => {
    const { value } = e.target;
    const numValue = parseInt(value);
    if (
      (numValue > MIN_SAFE_DELAY_VALUE && numValue <= MAX_SAFE_DELAY_VALUE) ||
      value === ""
    ) {
      setSetting((pre) => {
        return { ...pre, safeDelay: numValue };
      });
    }
  };

  return (
    <ModalWrapper style={{ width: "52%" }}>
      <div
        onClick={(e) => {
          setIsEmoji(false);
        }}
      >
        <div className="modal-tilte">
          <h2>Invite Joiner</h2>
        </div>
        <AppSpacer spacer={30} />
        <div className="joiner-custom-input">
          <AppInputField
            fieldTitle="Invite Code"
            onChange={handleInviteChange}
            placeholderText="Enter Invite Code"
            value={setting.inviteCode}
            onCopy={handleInviteChange}
          />
        </div>
        <AppSpacer spacer={10} />
        <div className="direct-join-column-wrapper">
          <div className="direct-join-column">
            <AppInputField
              fieldTitle="Token Group"
              placeholderText={
                claimerList.length > 0
                  ? "Select Token Group"
                  : "Add Token Group"
              }
              selectOptions={makeClaimerSelectOption(claimerList)}
              onChange={handleClaimer}
              onMenuOpen={handleClaimerMenuOpen}
              value={getClaimerValue(claimerList, setting.claimerGroup)}
              isSelect={claimerList.length > 0 ? true : false}
              disabled={claimerList.length > 0 ? false : true}
              navigate={
                claimerList.length > 0 ? () => {} : handleClaimerMenuOpen
              }
            />
          </div>
          <div className="direct-join-column">
            <AppInputField
              fieldTitle="Proxy Group"
              placeholderText={
                proxyGroupList.length > 0
                  ? "Select Proxy Group"
                  : "Add Proxy group"
              }
              selectOptions={makeProxyOptions(proxyGroupList)}
              onChange={handleSelectProxyGroup}
              value={getProxyGroupValue()}
              onMenuOpen={handleProxyMenuOpen}
              isSelect={proxyGroupList.length > 0 ? true : false}
              disabled={proxyGroupList.length > 0 ? false : true}
              navigate={
                proxyGroupList.length > 0 ? () => {} : handleProxyMenuOpen
              }
            />
          </div>
          <div className="direct-join-column">
            <AppInputField
              fieldTitle="Delay"
              type="number"
              min={MIN_SAFE_DELAY_VALUE}
              max={MAX_SAFE_DELAY_VALUE}
              placeholderText="Enter Delay"
              onChange={handleDelayChange}
              value={setting.safeDelay === 0 ? "" : setting.safeDelay}
            />
          </div>
        </div>
        <AppSpacer spacer={10} />
        <div className="joiner-custom-input">
          <label>React</label>
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
              <div className="emoji-picker-wrapper">
                <AppInputField
                  fieldTitle="Emoji"
                  placeholderText="Enter Emoji"
                  onChange={handleReactChange}
                  onCopy={handleReactChange}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmojiState();
                  }}
                  name="emojiValue"
                  value={setting.reactSetting.emojiValue}
                />
                {isEmoji && (
                  <div className="emoji-tray-picker">
                    <Picker onSelect={addEmoji} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <AppSpacer spacer={10} />
        <div className="joiner-custom-input">
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
                multiHeight="80px"
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
      </div>
    </ModalWrapper>
  );
}

export default InviteJoinerSettings;
