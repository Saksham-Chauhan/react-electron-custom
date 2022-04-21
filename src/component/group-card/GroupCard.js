import React from 'react'
import './styles.css'
import wifi from '../../assests/images/wifi.svg'
import decline from '../../assests/images/decline.svg'
import inProcess from '../../assests/images/inProcess.svg'
import success from '../../assests/images/success.svg'
import { fetchThemsState } from '../../features/counterSlice'
import { useSelector } from 'react-redux'
import { AppSpacer } from '..'

const StatusIcons = ({ Icon, appTheme }) => (
  <div className="stausIcons">
    <img src={Icon} alt="" />
    <span className={appTheme ? 'lightMode_color ' : ''}>10</span>
  </div>
)

function GroupCard({
  cardIcon = wifi,
  cardTitle = '',
  cardSubtitle = '',
  activeClass = '',
  hideSubText = false,
  isCustomAction = false,
  actionColumn,
  totalDecline = 0,
  totalSuccess = 0,
  totalInProgress = 0,
  ...props
}) {
  const appTheme = useSelector(fetchThemsState)

  return (
    <div {...props} className="group-card">
      <div
        className={
          appTheme ? 'group-card-inner light-mode-card' : 'group-card-inner'
        }
      >
        <div className="groupCard_heading">
          <img src={cardIcon} alt="" />
          <h5 className={appTheme ? 'lightMode_color ' : ''}>{cardTitle}</h5>
        </div>
        <AppSpacer spacer={13} />
        <div className="groupCard_Status">
          <StatusIcons Icon={inProcess} {...{ appTheme }} />
          <StatusIcons Icon={success} {...{ appTheme }} />
          <StatusIcons Icon={decline} {...{ appTheme }} />
        </div>
      </div>
    </div>
  )
}

export default GroupCard
