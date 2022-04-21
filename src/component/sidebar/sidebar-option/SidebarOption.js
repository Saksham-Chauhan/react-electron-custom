import React from 'react'
import './styles.css'
import { NavLink as Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchThemsState } from '../../../features/counterSlice'
const SideBarOption = ({
  activeIcon,
  defaultIcon,
  pageTo,
  activeClass,
  isLink = true,
  ...props
}) => {
  const appTheme = useSelector(fetchThemsState)
  return isLink ? (
    <Link
      to={pageTo}
      className={
        appTheme
          ? ({ isActive }) =>
              !isActive
                ? `sidebar-option `
                : `sidebar-option light-mode-active-link`
          : ({ isActive }) =>
              !isActive ? `sidebar-option ` : `sidebar-option active-link `
      }
    >
      <div className={`sidebar-option-inner bg-animation-css  ${activeClass} `}>
        <img src={defaultIcon} alt="active-sidebar-icon" />
        <img src={activeIcon} alt="active-sidebar-icon" />
        <div className="anim" />
      </div>
    </Link>
  ) : (
    <div {...props} className={`sidebar-option `}>
      <div className={`sidebar-option-inner  ${activeClass} `}>
        <img src={defaultIcon} alt="active-sidebar-icon" />
        <img src={activeIcon} alt="active-sidebar-icon" />
      </div>
    </div>
  )
}

export default SideBarOption
