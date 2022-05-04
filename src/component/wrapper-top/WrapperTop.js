import React from 'react'
import { useSelector } from 'react-redux'
import { fetchThemsState } from '../../features/counterSlice'
import './styles.css'

function WrapperTop({ children }) {
  const appTheme = useSelector(fetchThemsState)
  return (
    <div className={appTheme ? 'wrapper light-mode-Bottom-border' : 'wrapper'}>
      <div>{children}</div>
    </div>
  )
}

export default WrapperTop
