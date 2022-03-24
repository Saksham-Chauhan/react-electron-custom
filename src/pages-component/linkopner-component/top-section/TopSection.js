import React from "react";
import { useSelector } from "react-redux";
import { GroupStatusCard, TopWrapper } from "../../../component";
import { fetchSelectedMinitorTokenLinkOpener } from "../../../features/counterSlice";

function TopSection({ logList }) {
  const selectedMonitorToken = useSelector(fetchSelectedMinitorTokenLinkOpener);

  return (
    <TopWrapper>
      <GroupStatusCard
        subText={`${Object.keys(logList).length} Links opened`}
        title={selectedMonitorToken["accountName"] || ""}
      />
    </TopWrapper>
  );
}

export default TopSection;
