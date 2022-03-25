import React from "react";
import { GroupStatusCard, TopWrapper } from "../../../component";

function TopSection({ logList, selectedToken }) {
  return (
    <TopWrapper>
      <GroupStatusCard
        subText={`${Object.keys(logList).length} invite joined`}
        title={selectedToken["accountName"] || ""}
      />
    </TopWrapper>
  );
}

export default TopSection;
