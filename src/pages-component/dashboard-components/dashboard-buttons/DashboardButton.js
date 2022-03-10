import React from "react";
import { Link } from "react-router-dom";
import "./dashboardbutton.css";

const DashboardButton = ({ to, image, text, value }) => {
  return (
    <Link to={to} className="dashboard-button centerd">
      <img src={image} alt="image" />
      <p className="centerd">
        <p className="text">{text}</p>
        {value ? <p className="value">{value}</p> : ""}
      </p>
    </Link>
  );
};

export default DashboardButton;
