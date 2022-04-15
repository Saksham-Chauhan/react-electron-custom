import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchThemsState, setThemeState } from '../../features/counterSlice'
import { AppToggler } from '..'
const DarkMode = () => {
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
    <div className="darkMode">
      <AppToggler
        id="turn-twitter-monitor"
        name="twitterMonitor"
        onClick={handleToggle}
      />
      <p>light mode</p>
    </div>
  )
}

export default DarkMode
