import React from 'react'
import './chartlabel.css'
import linkdot from '../../../assests/images/link-dot.svg'
import invite from '../../../assests/images/invite-dot.svg'
import tweets from '../../../assests/images/tweet-dot.svg'
import spoofs from '../../../assests/images/spoof-dot.svg'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'
const ChartLabel = () => {
  const appTheme = useSelector(fetchThemsState)
  return (
    <div className={appTheme ? 'chartlabel lightMode_color' : 'chartlabel'}>
      <div>
        <img src={linkdot} alt="" className="dot" />
        <span>Links Joined</span>
      </div>
      <div>
        <img src={invite} alt="" className="dot" />
        <span>Invites Joined</span>
      </div>
      <div>
        <img src={tweets} alt="" className="dot" />
        <span>Spoofs Opened</span>
      </div>
      <div>
        <img src={spoofs} alt="" className="dot" />
        <span>Tweets Catched</span>
      </div>
    </div>
  )
}

export default ChartLabel
