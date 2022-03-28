import React from "react";
import { TopWrapper, GroupStatusCard } from "../../../component";
function TopSection({ selectedCard }) {
  return (
    <TopWrapper>
      <GroupStatusCard
        subText="4 Tasks Running"
        title={selectedCard["cardTitle"]}
      />
    </TopWrapper>
  );
}

export default TopSection;
