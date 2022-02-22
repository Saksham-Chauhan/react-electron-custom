import React from "react";
import "./styles.css";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import test from "../../../assests/images/chemistry.svg";
function ProxyTableRow() {
  return (
    <div className="tbl-header body">
      <div className="tbl-header-title body">#</div>
      <div className="tbl-header-title body">proxy</div>
      <div className="tbl-header-title body">user</div>
      <div className="tbl-header-title body">password</div>
      <div className="tbl-header-title body">status</div>
      <div className="tbl-header-title body action-col">
        <img src={edit}  className='btn' alt="" />
        <img src={trash} className='btn' alt="" />
        <img src={test}  className='btn' alt="" />
      </div>
    </div>
  );
}

export default ProxyTableRow;
