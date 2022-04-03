import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import { RoutePath } from "../../constant";
import {
  fetchClaimerGroupList,
  fetchProxyGroupList,
  fetchSelectedAccChangerCard,
  setModalState,
} from "../../features/counterSlice";
import { addDataInTableList } from "../../features/logic/acc-changer";
import {
  getClaimerValue,
  makeClaimerSelectOption,
  makeProxyOptions,
} from "../../helper";
import {
  activityChangerValidation,
  basicAccChangerValidation,
  massInviteJoinerValidation,
  nicknameChangerValidation,
} from "./helper";
import {
  UserNameChangerSlide,
  ActivityChangerSlide,
  AvatarChangerSlide,
  PasswordChnagerSlide,
  ServerLeaverSlide,
  TokenCheckerSlide,
  MassInviteSlide,
} from "./slides";
import NicknameChanger from "./slides/NicknameChanger";
import randomNamne from "node-random-name";
function AccountChanger() {
  const navigate = useNavigate();
  const selectedCard = useSelector(fetchSelectedAccChangerCard);
  const proxyGroupList = useSelector(fetchProxyGroupList);
  const claimerGroupList = useSelector(fetchClaimerGroupList);
  const dispatch = useDispatch();
  const [accountChanger, setAccountChanger] = useState({
    proxyGroup: {},
    claimerGroup: {},
    status: "idle",
    createdAt: new Date().toUTCString(),
  });

  const handleClaimerMenuOpen = () => {
    if (claimerGroupList.length === 0) {
      navigate(RoutePath.setting, { replace: true });
      handleCloseModal();
    }
  };

  const handleProxyMenuOpen = () => {
    if (proxyGroupList.length === 0) {
      navigate(RoutePath.proxy, { replace: true });
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    dispatch(setModalState("accountChangerModal"));
  };

  const getProxyGroupValue = () => {
    if (Object.keys(accountChanger.proxyGroup).length > 0) {
      const result = proxyGroupList.filter(
        (group) => group["id"] === accountChanger.proxyGroup["id"]
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
    }
    return [];
  };

  const handleClaimer = (data) => {
    let arr = [];
    if (selectedCard["changerType"] === "nicknameChanger") {
      data["value"]?.split("\n").forEach((grp) => {
        arr.push(randomNamne());
      });
      setAccountChanger((pre) => {
        return { ...pre, nicknameGenerate: arr.join("\n") };
      });
    }
    setAccountChanger((pre) => {
      return {
        ...pre,
        claimerGroup: data,
      };
    });
  };

  const handleSelectProxyGroup = (group) => {
    if (Object.keys(group).length > 0) {
      setAccountChanger((pre) => {
        return {
          ...pre,
          proxyGroup: group,
        };
      });
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAccountChanger((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleRefreshName = () => {
    let arr = [];
    accountChanger.claimerGroup["value"]?.split("\n").forEach((grp) => {
      arr.push(randomNamne());
    });
    setAccountChanger((pre) => {
      return { ...pre, nicknameGenerate: arr.join("\n") };
    });
  };

  const handleSubmit = () => {
    const validation = basicAccChangerValidation(accountChanger);
    const type = selectedCard["changerType"];
    if (validation) {
      let valid;
      if (type === "activityChanger") {
        valid = activityChangerValidation(accountChanger);
      } else if (type === "nicknameChanger") {
        valid = nicknameChangerValidation(accountChanger);
      } else if (type === "massInviter") {
        valid = massInviteJoinerValidation(accountChanger);
      } else {
        valid = true;
      }
      if (valid) {
        dispatch(addDataInTableList(accountChanger));
        handleCloseModal();
      }
    }
  };

  const handleSelectAPI = (obj) => {
    setAccountChanger((pre) => {
      return { ...pre, url: obj.key };
    });
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Create Task</h2>
      </div>
      <AppSpacer spacer={30} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Type"
            disabled={true}
            placeholderText={selectedCard["cardTitle"] || ""}
          />
        </div>
      </div>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Token Group"
            placeholderText={
              claimerGroupList.length > 0
                ? "Select Token Group"
                : "Add Token Group"
            }
            onMenuOpen={handleClaimerMenuOpen}
            selectOptions={makeClaimerSelectOption(claimerGroupList)}
            onChange={handleClaimer}
            value={getClaimerValue(
              claimerGroupList,
              accountChanger.claimerGroup
            )}
            isSelect={claimerGroupList.length > 0 ? true : false}
            disabled={claimerGroupList.length > 0 ? false : true}
            navigate={
              claimerGroupList.length > 0 ? () => {} : handleProxyMenuOpen
            }
          />
        </div>
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Proxy Group"
            placeholderText={
              proxyGroupList.length > 0
                ? "Select Proxy Group"
                : "Add Proxy group"
            }
            onMenuOpen={handleProxyMenuOpen}
            value={getProxyGroupValue()}
            selectOptions={makeProxyOptions(proxyGroupList)}
            onChange={handleSelectProxyGroup}
            isSelect={proxyGroupList.length > 0 ? true : false}
            disabled={proxyGroupList.length > 0 ? false : true}
            navigate={
              proxyGroupList.length > 0 ? () => {} : handleProxyMenuOpen
            }
          />
        </div>
      </div>
      <AppSpacer spacer={10} />
      {getDynamicSlideRnder(
        selectedCard["changerType"],
        handleChange,
        handleSelectAPI,
        accountChanger,
        handleRefreshName
      )}
      <AppSpacer spacer={30} />
      <div className="modal-control-btns">
        <div onClick={handleCloseModal} className="modal-cancel-btn btn">
          <span>Cancel</span>
        </div>
        <div onClick={handleSubmit} className="modal-cancel-btn submit btn">
          <span>Create</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default AccountChanger;

const getDynamicSlideRnder = (
  type,
  handleChange,
  handleSelect,
  state,
  handleRefreshName
) => {
  switch (type) {
    case "avatarChanger":
      return (
        <AvatarChangerSlide
          onChange={handleChange}
          handleSelectAPI={handleSelect}
        />
      );
    case "serverLeaver":
      return <ServerLeaverSlide onChange={handleChange} />;
    case "usernameChanger":
      return <UserNameChangerSlide onChange={handleChange} />;
    case "activityChanger":
      return <ActivityChangerSlide onChange={handleChange} />;
    case "nicknameChanger":
      return (
        <NicknameChanger
          onRefresh={handleRefreshName}
          state={state}
          onChange={handleChange}
        />
      );
    case "passwordChanger":
      return <PasswordChnagerSlide onChange={handleChange} />;
    case "tokenChecker":
      return <TokenCheckerSlide onChange={handleChange} />;
    case "massInviter":
      return <MassInviteSlide onChange={handleChange} />;
    default:
      return <UserNameChangerSlide onChange={handleChange} />;
  }
};