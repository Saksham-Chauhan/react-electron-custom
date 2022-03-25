import React from "react";
import { useDispatch } from "react-redux";
import { InputFieldWithScrollList } from "../..";
import { clearLogList } from "../../../features/counterSlice";
import { handleExportLogs } from "../../../helper";
import { toastWarning } from "../../../toaster";

function LogSection({ logList }) {
  const dispatch = useDispatch();

  const handleExport = () => {
    if (logList.length > 0) {
      handleExportLogs(logList);
    } else toastWarning("Nothing to import");
  };

  const handleClearLogs = () => {
    if (logList.length > 0) {
      dispatch(clearLogList({ key: "inviteJoiner" }));
    } else toastWarning("Nothing to delete");
  };

  return (
    <div>
      <InputFieldWithScrollList
        logAction={{
          onClear: handleClearLogs,
          onExport: handleExport,
        }}
        list={logList}
        isLogs={true}
        title="Logs"
      />
    </div>
  );
}

export default LogSection;
