import React from "react";
import { AppSpacer } from "../../component";
import {
  SpooferTableSection,
  SpooferTopBtnsWrraper,
  SpooferTopSection,
} from "../../pages-component";
import "./styles.css";
function Spoofer() {
  return (
    <div className="spoofer-page-outer-section">
      <SpooferTopSection />
      <div className="spoofer-page-inner-section">
        <AppSpacer spacer={30} />
        <SpooferTopBtnsWrraper />
        <AppSpacer spacer={20} />
        <SpooferTableSection />
      </div>
    </div>
  );
}

export default Spoofer;
