import React from 'react'
import { useSelector } from 'react-redux'
import { fetchThemsState } from '../../features/counterSlice'
import './styles.css'
function Switch({ id, ...props }) {
  const appTheme = useSelector(fetchThemsState)
  return appTheme ? (
    <div className="lightMode-switch-container">
      <input {...props} id={id} type="checkbox" />
      <label htmlFor={id}></label>
    </div>
  ) : (
    <div className="app-switch-container">
      <input {...props} id={id} type="checkbox" />
      <label htmlFor={id}></label>
    </div>
  )
}

export default Switch
