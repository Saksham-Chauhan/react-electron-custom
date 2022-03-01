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
import { isValueInUse } from "../../../helper";
import { toastWarning } from "../../../toaster";

function LeftSection({
  handleOpenModal,
  accountList,
  selectedMonitorToken,
  settingOption,
}) {
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
    const result = isValueInUse(
      accountList,
      "discordToken",
      selectedMonitorToken
    );
    if (!result && settingOption?.linkOpenerState) {
      dispatch(deleteAccountFromList(account));
    } else toastWarning("Token in use!!");
  };

  return (
    <React.Fragment>
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
              account["discordToken"] === selectedMonitorToken
                ? "active-card"
                : ""
            }
            onClick={() => handleAccountSelect(account)}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default LeftSection;
