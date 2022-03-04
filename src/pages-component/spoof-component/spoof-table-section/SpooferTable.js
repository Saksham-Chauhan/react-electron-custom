import React from "react";
import "./styles.css";
import {
  stopSpoofer,
  startSpoofer,
  toggleSpoofer,
  deleteSpoofer,
} from "../../../helper/electron-bridge";
import { useDispatch } from "react-redux";
import TableRow from "../spoof-table-row/SpooferTableRow";
import { deleteSpooferFromList } from "../../../features/logic/spoof";

function SpooferTable({ tableList }) {
  const dispatch = useDispatch();

  const handleStart = (spoof, setValue) => {
    startSpoofer(spoof);
    setValue((pre) => !pre);
  };

  const handleDelete = (spoof) => {
    deleteSpoofer(spoof);
    dispatch(deleteSpooferFromList(spoof));
  };

  const handleToggle = (spoof) => {
    toggleSpoofer(spoof);
  };

  const handleStop = (spoof, setValue) => {
    stopSpoofer(spoof);
    setValue((pre) => !pre);
  };

  return (
    <div className="spoofer-page-table-section">
      <div className="spoofer-page-table-header">
        <div>#</div>
        <div>URL</div>
        <div>Proxy</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      <div className="spoofer-table-scroller">
        {tableList?.map((spoof, index) => (
          <TableRow
            {...{ spoof }}
            index={index + 1}
            key={spoof["id"]}
            onStop={handleStop}
            onStart={handleStart}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default SpooferTable;
