import React from 'react'
import './styles.css'
import wifi from '../../assests/images/wifi.svg'
import decline from '../../assests/images/decline.svg'
import inProcess from '../../assests/images/inProcess.svg'
import success from '../../assests/images/success.svg'

const StatusIcons = ({ Icon }) => (
  <div className="stausIcons">
    <img src={Icon} alt="" />
    <span>10</span>
  </div>
)

function GroupCard({
  cardIcon = wifi,
  cardTitle = 'Proxy Group 1',
  cardSubtitle = '3 proxies',
  activeClass = '',
  hideSubText = false,
  isCustomAction = false,
  actionColumn,
  ...props
}) {
  return (
    <div {...props} className="group-card">
      <div className="group-card-inner ">
        <div className="groupCard_heading">
          <img src={cardIcon} alt="" />
          <h5>{cardTitle}</h5>
        </div>

        <div className="groupCard_Status">
          <StatusIcons Icon={inProcess} />
          <StatusIcons Icon={success} />
          <StatusIcons Icon={decline} />
        </div>
      </div>
    </div>
  )
}

export default GroupCard
