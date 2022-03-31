import React from "react";
import "./styles.css";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import edit from "react-useanimations/lib/edit";
import test from "../../../assests/images/chemistry.svg";

function ProxyTableRow({ data, index, onEdit, onDelete, onTest }) {
  let proxyArr = data["proxy"]?.split(":");
  return (
    <div className="tbl-header-inner body">
      <div className="tbl-header-title body">{index}</div>
      <div className="tbl-header-title body">{`${proxyArr[0]}:${proxyArr[1]}`}</div>
      <div className="tbl-header-title body">{proxyArr[2]}</div>
      <div className="tbl-header-title body">{proxyArr[3]}</div>
      <div
        style={{
          color: getColor(data["status"]),
        }}
        className="tbl-header-title body"
      >
        {data["status"]}
      </div>
      <div className="tbl-header-title body action-col">
        <img onClick={() => onTest(data)} src={test} className="btn" alt="" />
        <UseAnimations
          onClick={() => onEdit(data)}
          animation={edit}
          strokeColor="#ffff"
          size={20}
          wrapperStyle={{ cursor: "pointer" }}
        />
        <UseAnimations
          onClick={() => onDelete(data)}
          animation={trash2}
          strokeColor="#B60E0E"
          size={25}
          wrapperStyle={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default ProxyTableRow;

const getColor = (status) => {
  switch (status) {
    case "Bad":
      return "var(--red)";
    case "N/A":
      return "var(--primary)";
    case "Testing..":
      return "#00c6b9";
    default:
      return "var(--status)";
  }
};
