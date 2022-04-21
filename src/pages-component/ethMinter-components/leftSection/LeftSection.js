import React from "react";
import {
  GroupCard,
  AppSpacer,
  TopWrapper,
  GroupTitle,
} from "../../../component";
import {
  setModalState,
  fetchNftGroupListState,
  setActiveNftGroup,
} from "../../../features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import solanaSol from "../../../assests/images/solanaSol.svg";

const LeftSection = ({ activeNftGroup }) => {
  const dispatch = useDispatch();
  const list = useSelector(fetchNftGroupListState);

  const handleOpenModal = () => {
    dispatch(setModalState("nftGroupModal"));
  };

  const handleGroupSelect = (group) => {
    dispatch(setActiveNftGroup(group));
  };

  console.log(activeNftGroup);
  return (
    <React.Fragment>
      <TopWrapper>
        <GroupTitle onClick={handleOpenModal} title="ETH Minter" />
      </TopWrapper>
      <AppSpacer spacer={20} />
      <div className="group-card-scroll">
        {list?.map((group) => (
          <GroupCard
            onClick={() => handleGroupSelect(group)}
            cardIcon={solanaSol}
            key={group["id"]}
            hideSubText={true}
            activeClass={group["id"] === activeNftGroup["id"] && "activeNft"}
            cardTitle={group["minterTitle"] || "Group 1"}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default LeftSection;
