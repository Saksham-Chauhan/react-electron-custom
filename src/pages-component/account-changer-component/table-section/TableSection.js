import React from "react";
import "./styles.css";
import TableRow from "../table-row/TableRow";

function TableSection({ selectedCard }) {
  return (
    <div className="acc-changer-page-table-section">
      <div className="acc-chnager-table-header-parent">
        <div className="acc-chnager-page-table-header">
          <div>#</div>
          <div>Token Group</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
      </div>
      <div className="acc-changer-table-scroller">
        {selectedCard?.list?.map((obj) => (
          <TableRow {...{ obj }} />
        ))}
      </div>
    </div>
  );
}

export default TableSection;
