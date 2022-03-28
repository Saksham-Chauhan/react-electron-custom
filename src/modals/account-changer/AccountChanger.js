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
import {
  getClaimerValue,
  makeClaimerSelectOption,
  makeProxyOptions,
} from "../../helper";
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

function AccountChanger() {
  const navigate = useNavigate();
  const selectedCard = useSelector(fetchSelectedAccChangerCard);
  const proxyGroupList = useSelector(fetchProxyGroupList);
  const claimerGroupList = useSelector(fetchClaimerGroupList);
  const dispatch = useDispatch();
  const [accountChanger, setAccountChanger] = useState({
    proxyGroup: {},
    claimerGroup: {},
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

  const handleSubmit = () => {};

  const onChange = (e) => {
    setAccountChanger((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
    console.log(accountChanger);
  };

  const getDynamicSlideRnder = (type) => {
    switch (type) {
      case "avatarChanger":
        return <AvatarChangerSlide onChange={onChange} />;
      case "serverLeaver":
        return <ServerLeaverSlide onChange={onChange} />;
      case "usernameChanger":
        return <UserNameChangerSlide onChange={onChange} />;
      case "activityChanger":
        return <ActivityChangerSlide onChange={onChange} />;
      case "nicknameChanger":
        return <NicknameChanger onChange={onChange} />;
      case "passwordChanger":
        return <PasswordChnagerSlide onChange={onChange} />;
      case "tokenChecker":
        return <TokenCheckerSlide onChange={onChange} />;
      case "massInviter":
        return <MassInviteSlide onChange={onChange} />;
      default:
        return UserNameChangerSlide;
    }
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
            isSelect={true}
            onChange={handleClaimer}
            value={getClaimerValue(
              claimerGroupList,
              accountChanger.claimerGroup
            )}
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
            isSelect={true}
          />
        </div>
      </div>
      <AppSpacer spacer={10} />
      {/* dynamic slide start */}

      {getDynamicSlideRnder(selectedCard["changerType"])}
      {/* dynamic slide render end */}
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
