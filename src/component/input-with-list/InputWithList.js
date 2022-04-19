import React from "react";
import "./styles.css";
import AppSpacer from "../spacer/Spacer";
import plus from "../../assests/images/plus.svg";
import exportIcon from "../../assests/images/export.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";

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
                  <UseAnimations
                    animation={trash2}
                    strokeColor="#B60E0E"
                    size={25}
                  ></UseAnimations>
                </div>
              </div>
            )}
            <AppSpacer spacer={10} />
            <div
              className={`scroll-list ${list.length === 0 && "full-height"}`}
            >
              {!isLogs
                ? list?.map((data, index) => (
                    <div key={data["id"] || index} className="scroll-list-item">
                      <span>{data["label"]}</span>
                      <UseAnimations
                        onClick={() => onDelete(data)}
                        animation={trash2}
                        strokeColor="#B60E0E"
                        size={25}
                        wrapperStyle={{ cursor: "pointer" }}
                      />
                    </div>
                  ))
                : list?.map((data, index) => (
                    <div key={`${data}-${index}`} className="scroll-list-item">
                      <span>{data}</span>
                    </div>
                  ))}
              {!isLogs && list.length === 0 && (
                <p className="blank-text">Leave Blank For All.</p>
              )}
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
