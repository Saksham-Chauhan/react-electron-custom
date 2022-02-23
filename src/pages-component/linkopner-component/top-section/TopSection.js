import React from "react";
import { GroupStatusCard, TopWrapper } from "../../../component";

function TopSection() {
  return (
    <TopWrapper>
      <div className="page-padding-section">
        <GroupStatusCard subText="2 Links opened" title="Account 1" />
      </div>
    </TopWrapper>
  );
}

export default TopSection;
