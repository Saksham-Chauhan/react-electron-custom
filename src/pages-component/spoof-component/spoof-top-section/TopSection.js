import React from "react";
import { GroupStatusCard, TopWrapper } from "../../../component";

const STATUS_MATCH = ["Running", "Opened"];

function TopSection({ tableList }) {
  return (
    <TopWrapper>
      <GroupStatusCard
        title="Spoofer"
        subText={`${
          tableList.filter((spoof) => STATUS_MATCH.includes(spoof["status"]))
            .length
        }  Tasks Running`}
      />
    </TopWrapper>
  );
}

export default TopSection;
