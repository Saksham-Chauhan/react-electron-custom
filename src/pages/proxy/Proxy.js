import React from "react";
import {
  GroupCard,
  GroupTitle,
  AppSpacer,
  AppDivider,
  GroupStatusCard,
} from "../../component";
import "./styles.css";
function Proxy() {
  return (
    <div className="page-section">
      <div className="page-section left-container">
        <AppSpacer spacer={20} />
        <GroupTitle />
        <AppSpacer spacer={20} />
        <AppDivider />
        <AppSpacer spacer={20} />
        <div className="group-card-scroll">
          <GroupCard />
        </div>
      </div>
      <div className="page-section right-container">
        <GroupStatusCard />
        <AppDivider />
      </div>
    </div>
  );
}

export default Proxy;
