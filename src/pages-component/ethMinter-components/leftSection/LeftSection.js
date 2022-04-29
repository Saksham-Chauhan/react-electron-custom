import React, { useEffect, useState } from "react";
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
import { NoAccountAlertModal } from "../../../modals";

const LeftSection = ({ activeNftGroup, tempList }) => {
  const [status, setStatus] = useState({
    idleTasks: 0,
    failedTasks: 0,
  });
  const dispatch = useDispatch();
  const list = useSelector(fetchNftGroupListState);

  const handleOpenModal = () => {
    dispatch(setModalState("nftGroupModal"));
  };

  const handleGroupSelect = (group) => {
    dispatch(setActiveNftGroup(group));
  };

  useEffect(() => {
    let idleTasks = 0;
    let failedTasks = 0;
    const getTasksStatus = () => {
      tempList.map((item) => {
        if (item.status === "success") {
          idleTasks++;
        }
        if (item.status === "failed" || item.status === "error") {
          failedTasks++;
        }
        return null;
      });
      setStatus(() => {
        return {
          idleTasks,
          failedTasks,
        };
      });
    };
    getTasksStatus();
  }, [tempList]);
  return (
    <React.Fragment>
      {list.length === 0 ? (
        <NoAccountAlertModal
          buttonPress={handleOpenModal}
          modalTitle="No Mint Group"
          buttonText="Create Minter Group"
        />
      ) : (
        Object.keys(activeNftGroup).length === 0 && (
          <NoAccountAlertModal hideBtn={true} modalTitle="Select  Group" />
        )
      )}
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
            totalInProgress={tempList.length}
            totalSuccess={status.idleTasks}
            totalDecline={status.failedTasks}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default LeftSection;
