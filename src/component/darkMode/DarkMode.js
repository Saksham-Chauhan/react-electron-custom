import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchThemsState, setThemeState } from '../../features/counterSlice'
import DarkModeToggle from 'react-dark-mode-toggle'

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => false)
  const dispatch = useDispatch()
  const appTheme = useSelector(fetchThemsState)
  useEffect(() => {
    dispatch(setThemeState(!isDarkMode))
  }, [isDarkMode, dispatch])
  return (
    <div className="darkMode">
      <div style={{ border: '1px solid #706A6A' }}>
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={40}
        />
      </div>
      <p className={appTheme ? 'lightMode_color ' : ''}>
        {appTheme ? 'Light' : 'Dark'} Mode
      </p>
    </div>
  )
}

export default DarkMode
