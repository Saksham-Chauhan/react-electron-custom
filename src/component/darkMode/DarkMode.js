import React from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchThemsState, setThemeState } from "../../features/counterSlice";
import DarkModeToggle from "react-dark-mode-toggle";

const DarkMode = () => {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  return (
    <div className="darkMode">
      <div style={{ border: "1px solid #706A6A" }}>
        <DarkModeToggle
          onChange={() => dispatch(setThemeState(!appTheme))}
          checked={!appTheme}
          size={40}
        />
      </div>
    </div>
  );
};

export default DarkMode;
