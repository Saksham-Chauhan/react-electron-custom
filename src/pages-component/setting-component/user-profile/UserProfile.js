import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logout from "../../../assests/images/logout.svg";
import user from "../../../assests/images/user.svg";
import { discordJoinedAtRegex } from "../../../constant/regex";
import {
  fetchWebhookListState,
  fetchWebhookSettingState,
  setUserDetails,
} from "../../../features/counterSlice";
import { MONTHS } from "../../../helper";
import { loggedUserWebhook } from "../../../helper/webhook";
import "./styles.css";

function UserProfile({ userDetails }) {
  const dispatch = useDispatch();
  const webhookList = useSelector(fetchWebhookListState);
  const option = useSelector(fetchWebhookSettingState);

  const makeDate = (str = "") => {
    let date = str.match(discordJoinedAtRegex);
    let trimDate = date[0];
    let splitDate = trimDate.split("-");
    let month = MONTHS[Number(splitDate[1] - 1 || "0")];
    return `${month} ${splitDate[0]}`;
  };

  const handleLogout = async () => {
    if (option?.logOnOff) {
      let title = `${userDetails.username}#${userDetails.discriminator} Log out 🥲 `;
      await loggedUserWebhook(title, webhookList[0]);
    }
    dispatch(setUserDetails({}));
  };

  return (
    <div className="flex-right-align">
      <div className="user-profile-section">
        <div className="discord-avatar">
          <img src={userDetails.avatar || user} alt="" />
        </div>
        <div className="user-profile-details">
          <h3>
            {userDetails.username}#{userDetails.discriminator}
          </h3>
          <p>User since {makeDate(userDetails.joined_at)}</p>
        </div>
        <div onClick={handleLogout} className="user-logout-btn btn">
          <img src={logout} alt="" />
          <span>logout</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
