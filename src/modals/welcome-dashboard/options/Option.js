import React from 'react'

import rightAero from '../../../assests/images/rightAero.svg'
import lighMode_Arrow from '../../../assests/images/lighMode_Arrow.svg'

import { fetchThemsState } from '../../../features/counterSlice'
import './style.css'
import { useSelector } from 'react-redux'
const Option = ({ logo, text, ...props }) => {
  const appTheme = useSelector(fetchThemsState)
  const textClass = appTheme ? 'lightMode_color' : ''
  return (
    <div {...props} className={appTheme ? 'options lightBg ' : 'options'}>
      <img src={logo} alt="logo" />
      <p className={textClass}>{text}</p>
      <img src={appTheme ? lighMode_Arrow : rightAero} alt="aero" />
    </div>
  )
}

export default Option
