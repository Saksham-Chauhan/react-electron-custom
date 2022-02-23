import React from "react";
import { useDispatch } from "react-redux";
import {
  AppSpacer,
  GroupCard,
  GroupTitle,
  TopWrapper,
} from "../../../component";
import {
  setEditStorage,
  setSelectedMonitorTokenLO,
} from "../../../features/counterSlice";
import discord from "../../../assests/images/discord.svg";
import { deleteAccountFromList } from "../../../features/logic/discord-account";

function LeftSection({ handleOpenModal, accountList, selctedMonitorToken }) {
  const dispatch = useDispatch();

  /**
   * function handle select account card
   **/
  const handleAccountSelect = (account) => {
    dispatch(setSelectedMonitorTokenLO(account["discordToken"]));
  };

  /**
   * function handle edit account card state
   **/
  const handleEditAccount = (account) => {
    dispatch(setEditStorage(account));
    handleOpenModal();
  };

  /**
   * function handle delete account card state
   **/
  const handleDeleteAccount = (account) => {
    dispatch(deleteAccountFromList(account));
  };
  return (
    <div>
      <TopWrapper>
        <GroupTitle onClick={handleOpenModal} title="Link Opener" />
      </TopWrapper>
      <AppSpacer spacer={20} />
      <div className="group-card-scroll">
        {accountList?.map((account) => (
          <GroupCard
            actionColumn={{
              onEdit: () => handleEditAccount(account),
              onDelete: () => handleDeleteAccount(account),
            }}
            cardIcon={discord}
            hideSubText={true}
            key={account["id"]}
            isCustomAction={true}
            cardTitle={account["accountName"]}
            activeClass={
              account["discordToken"] === selctedMonitorToken
                ? "active-card"
                : ""
            }
            onClick={() => handleAccountSelect(account)}
          />
        ))}
      </div>
    </div>
  );
}

export default LeftSection;
