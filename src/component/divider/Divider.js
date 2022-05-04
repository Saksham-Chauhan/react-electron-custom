import React from 'react'
import { fetchThemsState } from '../../features/counterSlice'
import { useSelector } from 'react-redux'
import './styles.css'
function Divider() {
  const appTheme = useSelector(fetchThemsState)

  return <div className={appTheme ? 'lightMode-divider ' : 'kyro-divider'} />
}

export default Divider
