import React from "react";
import { AppSpacer } from "../../component";
import {
  SpooferTopBtnsWrraper,
  SpooferTopSection,
} from "../../pages-component";
import "./styles.css";
function Spoofer() {
  return (
    <div className="spoofer-page-outer-section">
      <SpooferTopSection />
      <div className="spoofer-page-inner-section">
        <AppSpacer spacer={10} />
        <SpooferTopBtnsWrraper />
      </div>
    </div>
  );
}

export default Spoofer;
