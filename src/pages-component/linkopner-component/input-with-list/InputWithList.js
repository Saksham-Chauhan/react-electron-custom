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
  list = [],
  btnProps,
  inputProps,
  logAction,
  onDelete,
  isComingSoon = false,
}) {
  return (
    <div className="input-field-with-scroll-outer">
      <h4>{title}</h4>
      <AppSpacer spacer={15} />
      <div className="input-field-with-scroll-inner">
        {!isComingSoon ? (
          <React.Fragment>
            {!isLogs ? (
              <div className="input-field-flex">
                <input {...inputProps} placeholder={placeHolder} />
                <div {...btnProps} className="plus-icon-btn btn">
                  <img src={plus} alt="" />
                </div>
              </div>
            ) : (
              <div className="input-field-flex-log-section">
                <div
                  onClick={logAction?.onExport}
                  className="plus-icon-btn btn"
                >
                  <img src={exportIcon} alt="" />
                </div>
                <div onClick={logAction?.onClear} className="plus-icon-btn btn">
                  <img src={trash} alt="" />
                </div>
              </div>
            )}
            <AppSpacer spacer={10} />
            <div className="scroll-list">
              {!isLogs
                ? list?.map((data, index) => (
                    <div key={data["id"] || index} className="scroll-list-item">
                      <span>{data["label"]}</span>
                      <img onClick={() => onDelete(data)} src={trash} alt="" />
                    </div>
                  ))
                : list?.map((data, index) => (
                    <div key={`${data}-${index}`} className="scroll-list-item">
                      <span>{data}</span>
                    </div>
                  ))}
            </div>
          </React.Fragment>
        ) : (
          <div className="coming-soon-feature">
            <p>Coming Soon !!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputWithList;
