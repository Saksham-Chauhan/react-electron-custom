import React from 'react'
import { Link } from 'react-router-dom'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'
import './dashboardbutton.css'

const DashboardButton = ({ to, image, text, value }) => {
  const appTheme = useSelector(fetchThemsState)

  return (
    <Link
      to={to}
      className={
        appTheme
          ? 'dashboard-button centerd btn_shadow'
          : 'dashboard-button centerd'
      }
    >
      <img src={image} alt="fg" />
      <div className="centerd">
        <p className="text">{text}</p>
        {value ? <p className="value">{value}</p> : ''}
      </div>
    </Link>
  )
}

export default DashboardButton
