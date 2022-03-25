import React from "react";
import { useDispatch } from "react-redux";
import {
  AppSpacer,
  GroupCard,
  GroupTitle,
  TopWrapper,
} from "../../../component";
import discord from "../../../assests/images/discord.svg";
import {
  setEditStorage,
  setSelectedClaimerTokenIJ,
} from "../../../features/counterSlice";
import { deleteClaimerAccountFromList } from "../../../features/logic/discord-account";

function LeftSection({ handleOpenModal, accountList, selectedToken }) {
  const dispatch = useDispatch();

  /**
   * function handle select account card
   **/
  const handleAccountSelect = (account) => {
    dispatch(setSelectedClaimerTokenIJ(account));
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
    dispatch(deleteClaimerAccountFromList(account));
  };

  return (
    <div>
      <TopWrapper>
        <GroupTitle onClick={handleOpenModal} title="Invite Joiner" />
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
              account["id"] === selectedToken["id"] ? "active-card" : ""
            }
            onClick={() => handleAccountSelect(account)}
          />
        ))}
      </div>
    </div>
  );
}

export default LeftSection;
