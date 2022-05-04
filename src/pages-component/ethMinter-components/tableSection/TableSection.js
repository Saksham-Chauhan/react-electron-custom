import React from "react";
import "./style.css";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import edit from "../../../assests/images/edit.svg";
import UseAnimations from "react-useanimations";

const TableSection = ({ activeNftGroup }) => {
  return (
    <div className="minter-table padding-horizontal">
      <div className="table-header-parent">
        <div className="table-header">
          <div>#</div>
          <div>Contract</div>
          <div>Mode</div>
          <div>Wallet</div>
          <div>Status </div>
          <div>Action </div>
        </div>
      </div>
      <div className="minter-table-scroll">
        {activeNftGroup?.minterList?.map((row, index) => (
          <MinterTableRow {...{ row, index }} />
        ))}
      </div>
    </div>
  );
};

export default TableSection;

const MinterTableRow = ({ row, index }) => (
  <div className="table-header body">
    <div>{index + 1}</div>
    <div>Contract</div>
    <div>Mode</div>
    <div>Wallet</div>
    <div> Status </div>
    <div>
      <img src={play} alt="" />
      <img src={edit} alt="" />
      <UseAnimations
        wrapperStyle={{ cursor: "pointer" }}
        animation={trash2}
        strokeColor="#B60E0E"
        size={25}
      />
    </div>
  </div>
);
