import React from 'react'
import './styles.css'
import plus from '../../assests/images/plus.svg'
import lightModeplus from '../../assests/images/lightModeplus.svg'
import { fetchThemsState } from '../../features/counterSlice'
import { useSelector } from 'react-redux'
function GroupTitle({ title = 'Proxy Group', hideBtn = false, ...props }) {
  const appTheme = useSelector(fetchThemsState)

  return (
    <div className="group-title">
      <span className={appTheme ? 'lightMode_color ' : ''}>{title}</span>
      {!hideBtn && (
        <div
          {...props}
          className={appTheme ? 'group-title btn light-bg' : 'group-title btn'}
        >
          <img src={appTheme ? lightModeplus : plus} alt="" />
        </div>
      )}
    </div>
  )
}

export default GroupTitle
