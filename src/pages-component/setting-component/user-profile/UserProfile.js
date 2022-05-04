import React from 'react'
import './styles.css'
import {
  setUserDetails,
  fetchWebhookListState,
  fetchWebhookSettingState,
  fetchThemsState,
} from '../../../features/counterSlice'
import { MONTHS } from '../../../helper'
import user from '../../../assests/images/user.svg'
import { useDispatch, useSelector } from 'react-redux'
import logout from '../../../assests/images/logout.svg'
import { loggedUserWebhook } from '../../../helper/webhook'
import { discordJoinedAtRegex } from '../../../constant/regex'

function UserProfile({ userDetails }) {
  const dispatch = useDispatch()
  const webhookList = useSelector(fetchWebhookListState)
  const option = useSelector(fetchWebhookSettingState)
  const appTheme = useSelector(fetchThemsState)

  const makeDate = (str = '') => {
    let date = str.match(discordJoinedAtRegex)
    if (date !== undefined && date !== null) {
      let trimDate = date[0]
      let splitDate = trimDate?.split('-')
      let month = MONTHS[Number(splitDate[1] - 1 || '0')]
      return `${month} ${splitDate[0]}`
    }
  }

  const handleLogout = async () => {
    try {
      let title = `${userDetails?.username}#${userDetails?.discriminator} Logged out 🥲 `
      await loggedUserWebhook(title, webhookList[0], option?.logOnOff)
    } catch (e) {
      // console.log(e);
    }
    dispatch(setUserDetails({}))
  }

  const textClass = appTheme ? 'lightMode_color' : ''
  return (
    <div className="flex-right-align">
      <div className="user-profile-section">
        <div className="discord-avatar">
          <img src={userDetails?.avatar || user} alt="" />
        </div>
        <div className="user-profile-details">
          <h3 className={textClass}>
            {userDetails?.username}#{userDetails?.discriminator}
          </h3>
          <p className={textClass}>
            User since {makeDate(userDetails?.joined_at)}
          </p>
        </div>
        <div
          onClick={handleLogout}
          className={
            appTheme
              ? 'Light-mode-logoutbtn user-logout-btn btn'
              : 'user-logout-btn btn'
          }
        >
          <img src={logout} alt="" />
          <span>logout</span>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
