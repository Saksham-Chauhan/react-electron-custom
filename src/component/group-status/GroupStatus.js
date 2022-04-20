import React, { useState, useEffect } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { fetchThemsState } from '../../features/counterSlice'

function GroupStatus({ title = '', subText = '', isHide = false }) {
  const appTheme = useSelector(fetchThemsState)

  useEffect(() => {
    const h1 = document.getElementsByTagName('h1')
    const span = document.getElementsByTagName('span')
    if (appTheme) {
      h1[0].classList.add('lightMode_color')
      span[1].classList.add('lightMode_color')
    } else {
      h1[0].classList.remove('lightMode_color')
      span[1].classList.remove('lightMode_color')
    }
  }, [appTheme])

  return (
    <div className="group-status">
      <h1>{title}</h1>
      {!isHide && (
        <div className="group-status-stats">
          <span />
          <span>{subText}</span>
        </div>
      )}
    </div>
  )
}

export default GroupStatus
