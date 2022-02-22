import React from "react";
import "./styles.css";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import test from "../../../assests/images/chemistry.svg";

function ProxyTableRow({ data, index, onEdit, onDelete, onTest }) {
  let proxyArr = data["proxy"]?.split(":");
  return (
    <div className="tbl-header body">
      <div className="tbl-header-title body">{index}</div>
      <div className="tbl-header-title body">{`${proxyArr[0]}:${proxyArr[1]}`}</div>
      <div className="tbl-header-title body">{proxyArr[2]}</div>
      <div className="tbl-header-title body">{proxyArr[3]}</div>
      <div className="tbl-header-title body">{data["status"]}</div>
      <div className="tbl-header-title body action-col">
        <img onClick={() => onEdit(data)} src={edit} className="btn" alt="" />
        <img
          onClick={() => onDelete(data)}
          src={trash}
          className="btn"
          alt=""
        />
        <img onClick={() => onTest(data)} src={test} className="btn" alt="" />
      </div>
    </div>
  );
}

export default ProxyTableRow;
