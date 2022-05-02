import React from "react";
import { TopWrapper, GroupStatusCard } from "../../../component";

const STATUS = ["Running"];

function TopSection({ list }) {
  return (
    <TopWrapper>
      <GroupStatusCard
        subText={`${
          list?.filter((obj) => STATUS.includes(obj["status"])).length || 0
        } Running Task`}
        title="Tasks"
      />
    </TopWrapper>
  );
}

export default TopSection;
