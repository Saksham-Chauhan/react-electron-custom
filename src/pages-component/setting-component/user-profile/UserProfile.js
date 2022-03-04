import React from "react";
import logout from "../../../assests/images/logout.svg";
import user from "../../../assests/images/user.svg";
import "./styles.css";
function UserProfile() {
  return (
    <div className="flex-right-align">
      <div className="user-profile-section">
        <img src={user} alt="" />
        <div className="user-profile-details">
          <h3>Ayc#1313</h3>
          <p>User since March 2022</p>
        </div>
        <div className="user-logout-btn btn">
          <img src={logout} alt="" />
          <span>logout</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
