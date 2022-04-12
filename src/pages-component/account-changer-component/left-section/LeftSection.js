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
import tokenRetrieve from "../../../assests/images/token-retrieve.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccChangerListState,
  setSelctedAccChangerCard,
} from "../../../features/counterSlice";

function LeftSection({ selectedCard }) {
  const accountList = useSelector(fetchAccChangerListState);
  const dispatch = useDispatch();

  const handleSelectedCard = (card) => {
    dispatch(setSelctedAccChangerCard(card));
  };

  return (
    <>
      <TopWrapper>
        <GroupTitle hideBtn={true} title="Discord" />
      </TopWrapper>
      <div style={{ overflowY: "scroll", height: "88%" }}>
        <AppSpacer spacer={20} />
        <div className="group-card-scroll">
          {accountList.map((option) => {
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
      </div>
    </>
  );
}

export default LeftSection;

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
    case "tokenRetrieve":
      return tokenRetrieve;
    case "giveawayJoiner":
      return tokenRetrieve;
    default:
      return usernameChanger;
  }
};
