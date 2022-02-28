import React from "react";
import "./styles.css";
import { AppSpacer } from "../../../component";
import plus from "../../../assests/images/plus.svg";
import trash from "../../../assests/images/trash.svg";
import exportIcon from "../../../assests/images/export.svg";

function InputWithList({
  title = "Channel ID[s]",
  placeHolder = "Enter User Name",
  isLogs = false,
  list = [{ value: "id", label: "Label" }],
  btnProps,
  inputProps,
  onDelete,
}) {
  return (
    <div className="input-field-with-scroll-outer">
      <h4>{title}</h4>
      <AppSpacer spacer={15} />
      <div className="input-field-with-scroll-inner">
        {!isLogs ? (
          <div className="input-field-flex">
            <input {...inputProps} placeholder={placeHolder} />
            <div {...btnProps} className="plus-icon-btn btn">
              <img src={plus} alt="" />
            </div>
          </div>
        ) : (
          <div className="input-field-flex-log-section">
            <div className="plus-icon-btn btn">
              <img src={exportIcon} alt="" />
            </div>
            <div className="plus-icon-btn btn">
              <img src={trash} alt="" />
            </div>
          </div>
        )}
        <AppSpacer spacer={10} />
        <div className="scroll-list">
          {list?.map((data, index) =>
            !isLogs ? (
              <div key={data["id"] || index} className="scroll-list-item">
                <span>{data["label"]}</span>
                <img onClick={() => onDelete(data)} src={trash} alt="" />
              </div>
            ) : (
              <div key={data["id"] || index} className="scroll-list-item">
                <span>{data["label"]}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default InputWithList;
