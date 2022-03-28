import React from "react";
import {
  AppSpacer,
  GroupCard,
  GroupTitle,
  TopWrapper,
} from "../../../component";
import usernameChanger from "../../../assests/images/username-changer.svg";
import avatarChanger from "../../../assests/images/avatar-changer.svg";
import activityChanger from "../../../assests/images/activity-changer.svg";
import serverLeaver from "../../../assests/images/server-leaver.svg";
import tokenChecker from "../../../assests/images/token-checker.svg";
import nicknameChanger from "../../../assests/images/nickname-changer.svg";
import passwordChanger from "../../../assests/images/password-changer.svg";
import massInviter from "../../../assests/images/mass-inviter.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccChangerListState,
  setModalState,
  setSelctedAccChangerCard,
} from "../../../features/counterSlice";

function LeftSection({ selectedCard }) {
  const accountList = useSelector(fetchAccChangerListState);
  const dispatch = useDispatch();

  const handleSelectedCard = (card) => {
    dispatch(setSelctedAccChangerCard(card));
  };

  const handleModalState = () => {
    dispatch(setModalState("accountChangerModal"));
  };

  return (
    <>
      <TopWrapper>
        <GroupTitle onClick={handleModalState} title="Acc Changer" />
      </TopWrapper>
      <AppSpacer spacer={20} />
      <div className="group-card-scroll">
        {accountList.map((option) => {
          console.log(option["changerType"]);
          return (
            <GroupCard
              onClick={() => handleSelectedCard(option)}
              key={option["changerType"]}
              hideSubText={true}
              cardIcon={getIcon(option["changerType"])}
              cardTitle={option["cardTitle"]}
              activeClass={
                selectedCard["changerType"] === option["changerType"]
                  ? "active-card"
                  : ""
              }
            />
          );
        })}
      </div>
    </>
  );
}

export default LeftSection;

const AccountChangerOptionList = [
  {
    cardIcon: usernameChanger,
    cardTitle: "Username Changer",
    changerType: "usernameChanger",
    list: [],
  },
  {
    cardIcon: avatarChanger,
    cardTitle: "Avatar Changer",
    changerType: "avatarChanger",
  },
  {
    changerType: "activityChanger",
    cardIcon: activityChanger,
    cardTitle: "Activity Changer",
  },
  {
    changerType: "serverLeaver",
    cardIcon: serverLeaver,
    cardTitle: "Server Leaver",
  },
  {
    changerType: "tokenChecker",
    cardIcon: tokenChecker,
    cardTitle: "Token checker",
  },
  {
    changerType: "nicknameChanger",
    cardIcon: nicknameChanger,
    cardTitle: "Nickname  Changer",
  },
  {
    changerType: "passwordChanger",
    cardIcon: passwordChanger,
    cardTitle: "Password Changer",
  },
  {
    changerType: "massInviter",
    cardIcon: massInviter,
    cardTitle: "Mass Joiner",
  },
];

const getIcon = (type) => {
  switch (type) {
    case "avatarChanger":
      return avatarChanger;
    case "serverLeaver":
      return serverLeaver;
    case "usernameChanger":
      return usernameChanger;
    case "activityChanger":
      return activityChanger;
    case "nicknameChanger":
      return nicknameChanger;
    case "passwordChanger":
      return passwordChanger;
    case "tokenChecker":
      return tokenChecker;
    case "massInviter":
      return massInviter;
    default:
      return usernameChanger;
  }
};
