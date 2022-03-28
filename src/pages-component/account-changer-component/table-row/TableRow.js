import React from "react";
import play from "../../../assests/images/play.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
const STATUS_VALUES = ["Running", "Stopped", "Idle"];

function TableRow({}) {
  return (
    <div className="acc-chnager-page-table-header body">
      <div>1</div>
      <div>Group 1</div>
      <div>Running</div>
      <div>
        <div className="acc-changer-table-row-action-column">
          <img src={play} alt="" />
          <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
        </div>
      </div>
    </div>
  );
}

export default TableRow;
