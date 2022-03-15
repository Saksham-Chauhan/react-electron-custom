import React from "react";
import { GroupStatusCard, TopWrapper } from "../../../component";

function TopSection({ title = "Twitter", subText = "10 tweets" }) {
  return (
    <TopWrapper>
      <GroupStatusCard subText={subText} {...{ title }} />
    </TopWrapper>
  );
}

export default TopSection;
