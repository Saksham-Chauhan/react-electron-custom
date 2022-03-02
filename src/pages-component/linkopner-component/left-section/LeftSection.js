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

function LeftSection({ handleOpenModal, accountList, selectedMonitorToken }) {
  const dispatch = useDispatch();

  /**
   * function handle select account card
   **/
  const handleAccountSelect = (account) => {
    dispatch(setSelectedMonitorTokenLO(account));
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
