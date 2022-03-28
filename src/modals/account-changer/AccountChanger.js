import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import {
  fetchSelectedAccChangerCard,
  setModalState,
} from "../../features/counterSlice";
import {
  UserNameChangerSlide,
  ActivityChangerSlide,
  AvatarChangerSlide,
  NickNameChangerSlide,
  PasswordChnagerSlide,
  ServerLeaverSlide,
  TokenCheckerSlide,
  MassInviteSlide,
} from "./slides";
import NicknameChanger from "./slides/NicknameChanger";

function AccountChanger() {
  const selectedCard = useSelector(fetchSelectedAccChangerCard);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setModalState("accountChangerModal"));
  };
  const handleSubmit = () => {};

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
            placeholderText=""
            isSelect={true}
          />
        </div>
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Proxy Group"
            placeholderText=""
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

const getDynamicSlideRnder = (type) => {
  switch (type) {
    case "avatarChanger":
      return <AvatarChangerSlide />;
    case "serverLeaver":
      return <ServerLeaverSlide />;
    case "usernameChanger":
      return <UserNameChangerSlide />;
    case "activityChanger":
      return <ActivityChangerSlide />;
    case "nicknameChanger":
      return <NicknameChanger />;
    case "passwordChanger":
      return <PasswordChnagerSlide />;
    case "tokenChecker":
      return <TokenCheckerSlide />;
    case "massInviter":
      return <MassInviteSlide />;
    default:
      return UserNameChangerSlide;
  }
};
