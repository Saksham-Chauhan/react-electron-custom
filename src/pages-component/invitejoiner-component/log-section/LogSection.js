import React from "react";
import { InputFieldWithScrollList } from "../..";

function LogSection() {
  return (
    <div>
      <InputFieldWithScrollList isLogs={true} title="Logs" />
    </div>
  );
}

export default LogSection;
