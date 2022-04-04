import React from "react";
import "./styles.css";
function Switch({ id, ...props }) {
  return (
    <div className="app-switch-container">
      <input {...props} id={id} type="checkbox" />
      <label htmlFor={id}></label>
    </div>
  );
}

export default Switch;
