import React from "react";
import { AppSpacer } from "../../../component";
import { InputFieldWithScrollList } from "../..";

function LogSection() {
  return (
    <React.Fragment>
      <AppSpacer spacer={20} />
      <InputFieldWithScrollList isLogs={true} title="Logs" />
    </React.Fragment>
  );
}

export default LogSection;
