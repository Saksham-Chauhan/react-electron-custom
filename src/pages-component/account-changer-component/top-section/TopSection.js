import React from "react";
import { TopWrapper, GroupStatusCard } from "../../../component";
const STATUS = ["Running"];
function TopSection({ selectedCard }) {
  return (
    <TopWrapper>
      <GroupStatusCard
        subText={`${
          selectedCard["list"].filter((obj) => STATUS.includes(obj["status"]))
            .length
        } Running Task`}
        title={selectedCard["cardTitle"]}
      />
    </TopWrapper>
  );
}

export default TopSection;
