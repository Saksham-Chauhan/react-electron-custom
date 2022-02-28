import React from "react";
import { GroupStatusCard, TopWrapper } from "../../../component";

function TopSection({ title = "Twitter" }) {
  return (
    <TopWrapper>
      <GroupStatusCard subText="10 tweets" {...{ title }} />
    </TopWrapper>
  );
}

export default TopSection;
