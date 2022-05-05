import React from "react";
import "./styles.css";
import AppSpacer from "../spacer/Spacer";
import plus from "../../assests/images/plus.svg";
import exportIcon from "../../assests/images/export.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import { useSelector } from "react-redux";
import { fetchThemsState } from "../../features/counterSlice";

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
  children,
}) {
  const appTheme = useSelector(fetchThemsState);

  const theme = {
    inputInnerScroll: appTheme
      ? "input-field-with-scroll-inner light-bg"
      : "input-field-with-scroll-inner",
    inputStyle: {
      background: appTheme ? "none " : "",
      color: appTheme ? "#706A6A" : "",
      border: appTheme ? " 1px solid #0D0027" : "",
    },
    plusIconBtn: appTheme
      ? "plus-icon-btn btn light-mode-sidebar"
      : "plus-icon-btn btn",
    blankText: appTheme ? "blank-text lightMode_color" : "blank-text",
    spanText: {
      color: appTheme ? "#0D0027" : "",
    },
  };

  return (
    <div className="input-field-with-scroll-outer">
      <div className="d-flex flex-with-tooltip">
        <h4 className={appTheme ? "lightMode_color" : ""}>{title}</h4>
        {children}
      </div>
      <AppSpacer spacer={15} />
      <div className={theme.inputInnerScroll}>
        {!isComingSoon ? (
          <React.Fragment>
            {!isLogs ? (
              <div className="input-field-flex">
                <input
                  {...inputProps}
                  placeholder={placeHolder}
                  style={theme.inputStyle}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      const { onClick } = btnProps;
                      onClick();
                    }
                  }}
                />
                <div {...btnProps} className={theme.plusIconBtn}>
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
                      <span style={theme.spanText}>{data["label"]}</span>
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
            </div>
          </React.Fragment>
        ) : (
          <div className="coming-soon-feature">
            <p className={theme.blankText}>Coming Soon !!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputWithList;
