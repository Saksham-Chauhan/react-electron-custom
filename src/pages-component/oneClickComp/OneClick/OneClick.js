import React from "react";
import "./OneClick.css";

const OneClick = ({ title, subTitle = "88 One clicks" }) => {
  return (
    <div className="OneClick_title">
      <p>{title}</p>

      {subTitle === " " ? (
        " "
      ) : (
        <ul className="sub_heading">
          <li>{subTitle}</li>
        </ul>
      )}
    </div>
  );
};

export default OneClick;
