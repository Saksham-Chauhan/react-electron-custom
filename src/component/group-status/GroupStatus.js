import React, { useState, useEffect } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { fetchThemsState } from '../../features/counterSlice'

function GroupStatus({ title = '', subText = '', isHide = false }) {
  const appTheme = useSelector(fetchThemsState)
  return (
    <div className="group-status">
      <h1 className={appTheme ? 'lightMode_color' : ''}>{title}</h1>
      {!isHide && (
        <div className="group-status-stats">
          <span />
          <span className={appTheme ? 'lightMode_color' : ''}>{subText}</span>
        </div>
      )}
    </div>
  )
}

export default GroupStatus
