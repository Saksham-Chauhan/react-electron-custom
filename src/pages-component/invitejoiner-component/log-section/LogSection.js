import React from "react";
import { InputFieldWithScrollList } from "../..";
import { handleExportLogs } from "../../../helper";
import { toastWarning } from "../../../toaster";

function LogSection({ logList }) {
  const handleExportLog = () => {
    if (logList.length > 0) {
      handleExportLogs(logList);
    } else toastWarning("Nothing to import");
  };

  return (
    <div>
      <InputFieldWithScrollList list={logList} isLogs={true} title="Logs" />
    </div>
  );
}

export default LogSection;
