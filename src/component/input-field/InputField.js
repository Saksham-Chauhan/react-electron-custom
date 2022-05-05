import React from "react";
import Select from "react-select";
import {
  selectCustomStyles,
  selectStyles,
  lightMode_selectStyles,
  LightMode_selectCustomStyles,
} from "./styles";
import NumberFormat from "react-number-format";
import "./styles.css";
import { useSelector } from "react-redux";
import { fetchThemsState } from "../../features/counterSlice";
import makeAnimated from "react-select/animated";
// import LabelWithTooltip from "../tooltip-label/LabelWithTooltip";
const animatedComponents = makeAnimated();

const DefaultOptions = [];

function InputField({
  isSelect = false,
  isCustomInputField = false,
  placeholderText = "Select Site",
  fieldTitle = "Site",
  hideLabel = false,
  format = "### ### ####",
  defaultValue = "",
  isMulti = false,
  multiHeight = "150px",
  selectOptions = DefaultOptions,
  isCustomLabel = false,
  autoClose = true,
  tooltip = false,
  submit,
  submitFlag = false,
  ...props
}) {
  const appTheme = useSelector(fetchThemsState);
  const textClass = appTheme ? "lightMode_color" : "";

  const CustomLabelStyle = appTheme
    ? LightMode_selectCustomStyles
    : selectCustomStyles;
  return (
    <div className="input-field-container" onClick={props.navigate}>
      {isCustomLabel && <label className="custom-label ">{fieldTitle}</label>}
      {!hideLabel && (
        <div className="d-flex">
          <label className={textClass} data-tip data-for={props.labelId}>
            {fieldTitle}
          </label>
          {props.hyperLink && (
            <label
              className={textClass}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                color: "#7878e9",
                textDecorationLine: "underline",
              }}
              onClick={() =>
                window.open("https://www.youtube.com/watch?v=YEgFvgg7ZPI")
              }
            >
              Need help with find your Discord Token?
            </label>
          )}
          {/* {tooltip && <LabelWithTooltip toolTopText={props.toolTipText} />} */}
        </div>
      )}
      {!isSelect ? (
        <div className="input-field-box">
          {!isMulti ? (
            !isCustomInputField ? (
              <input
                className={
                  appTheme
                    ? `${isCustomLabel} paragraph-color lightModeInput`
                    : `${isCustomLabel && "custom-label-input"}`
                }
                {...props}
                autoSave="off"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                placeholder={placeholderText}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 && submitFlag) {
                    submit();
                  }
                }}
              />
            ) : (
              <NumberFormat
                {...props}
                autoSave="off"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                placeholder={placeholderText}
                format={format}
              />
            )
          ) : (
            <textarea
              style={{
                height: multiHeight,
              }}
              {...props}
              placeholder={placeholderText}
              className={appTheme ? "light-mode-input " : ""}
            ></textarea>
          )}
        </div>
      ) : (
        <div className="input-field-box">
          <Select
            {...props}
            isMulti={isMulti}
            closeMenuOnSelect={autoClose}
            components={animatedComponents}
            placeholder={placeholderText}
            isOptionSelected={true}
            options={selectOptions}
            styles={
              isCustomLabel
                ? CustomLabelStyle
                : appTheme
                ? lightMode_selectStyles
                : selectStyles
            }
            isSearchable={false}
            defaultValue={defaultValue}
          />
        </div>
      )}
    </div>
  );
}

export default InputField;
