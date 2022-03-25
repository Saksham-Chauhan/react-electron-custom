import React from "react";
import { useDispatch } from "react-redux";
import { InputFieldWithScrollList } from "../..";
import { toastWarning } from "../../../toaster";
import { handleExportLogs } from "../../../helper";
import { clearLogList } from "../../../features/counterSlice";

function LogSection({ list }) {
  const dispatch = useDispatch();

  const handleClearLogs = () => {
    if (list.length > 0) {
      dispatch(clearLogList({ key: "linkOpener" }));
    } else toastWarning("Nothing to delete");
  };

  const handleExport = () => {
    if (list.length > 0) {
      handleExportLogs(list);
    } else {
      toastWarning("No log to export !!");
    }
  };

  return (
    <React.Fragment>
      <InputFieldWithScrollList
        logAction={{
          onClear: handleClearLogs,
          onExport: handleExport,
        }}
        {...{ list }}
        isLogs={true}
        title="Logs"
      />
    </React.Fragment>
  );
}

export default LogSection;
