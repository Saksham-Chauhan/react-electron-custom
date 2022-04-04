import React from "react";
import { useDispatch } from "react-redux";
import {
  AppSpacer,
  GroupCard,
  GroupTitle,
  TopWrapper,
} from "../../../component";
import { setSelectedMonitorTokenLO } from "../../../features/counterSlice";
import discord from "../../../assests/images/discord.svg";
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
    if (!settingOption?.linkOpenerState) {
      dispatch(setSelectedMonitorTokenLO(account));
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
            cardIcon={discord}
            hideSubText={true}
            key={account["id"]}
            cardTitle={account["accountName"]}
            activeClass={
              account["id"] === selectedMonitorToken["id"] ? "active-card" : ""
            }
            onClick={() => handleAccountSelect(account)}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default LeftSection;
