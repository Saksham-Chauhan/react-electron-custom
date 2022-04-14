import React, { useState, useEffect } from 'react'
import './styles.css'
import { AppToggler } from '..'
import { useSelector, useDispatch } from 'react-redux'
import { fetchThemsState } from '../../features/counterSlice'
import { setThemeState } from '../../features/counterSlice'

function GroupStatus({
  title = 'Proxy Group 1',
  subText = '2 Proxies running',
  isHide = false,
}) {
  const [lightMode, setlightMode] = useState(false)
  const dispatch = useDispatch()
  const appTheme = useSelector(fetchThemsState)
  const handleToggle = () => {
    setlightMode(!lightMode)
  }

  useEffect(() => {
    dispatch(setThemeState(lightMode))
  }, [lightMode, dispatch])

  return (
    <div className="group-status">
      <h1 className={appTheme ? 'lightMode_color' : ''}>{title}</h1>
      {!isHide && (
        <div className="group-status-stats">
          <span />
          <span className={appTheme ? 'lightMode_color' : ''}>{subText}</span>
        </div>
      )}

      <div className="darkMode">
        <AppToggler
          id="turn-twitter-monitor"
          name="twitterMonitor"
          onClick={handleToggle}
        />
        <p>light mode</p>
      </div>
    </div>
  )
}

export default GroupStatus
