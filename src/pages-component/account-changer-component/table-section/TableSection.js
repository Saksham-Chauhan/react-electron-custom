import React from "react";
import "./styles.css";
import TableRow from "../table-row/TableRow";
import { useDispatch } from "react-redux";
import { deleteDataFromTableList } from "../../../features/logic/acc-changer";

function TableSection({ selectedCard }) {
  const dispatch = useDispatch();
  const handleDelete = (obj) => {
    dispatch(deleteDataFromTableList(obj));
  };
  const handlePlay = (obj) => {
    console.log("data is", obj);
  };
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
        {selectedCard?.list?.map((obj, index) => (
          <TableRow
            index={index + 1}
            onDelete={handleDelete}
            onPlay={handlePlay}
            {...{ obj }}
            key={obj.id}
          />
        ))}
      </div>
    </div>
  );
}

export default TableSection;
