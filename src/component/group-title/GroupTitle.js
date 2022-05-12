import React from "react";
import "./styles.css";
import plus from "../../assests/images/plus.svg";
import lightModeplus from "../../assests/images/lightModeplus.svg";
import { fetchThemsState } from "../../features/counterSlice";
import { useSelector } from "react-redux";

function GroupTitle({
  title = "Proxy Group",
  hideBtn = false,
  onClick,
  ...props
}) {
  const appTheme = useSelector(fetchThemsState);

  return (
    <div className="group-title-card">
      <span className={appTheme ? "lightMode_color " : ""}>{title}</span>
      {!hideBtn && (
        <div
          {...props}
          onClick={onClick}
          className={
            appTheme ? "light-bg group-title-card-btn" : "group-title-card-btn"
          }
          style={{ cursor: "pointer" }}
        >
          <img src={appTheme ? lightModeplus : plus} alt="" />
        </div>
      )}
    </div>
  );
}

export default GroupTitle;
