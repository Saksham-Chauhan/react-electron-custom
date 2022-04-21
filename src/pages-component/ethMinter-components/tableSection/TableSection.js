import React from 'react'
import './style.css'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'

import play from '../../../assests/images/play.svg'
import trash2 from 'react-useanimations/lib/trash2'
import edit from '../../../assests/images/edit.svg'
import lightModeEditbtn from '../../../assests/images/lightModeEditbtn.svg'
import UseAnimations from 'react-useanimations'
const TableSection = () => {
  const appTheme = useSelector(fetchThemsState)

  return (
    <>
      <div className="minter-table">
        <div
          className={
            appTheme ? 'light-mode_table-color table-header' : 'table-header'
          }
        >
          <div>#</div>
          <div>Contract</div>
          <div>Mode</div>
          <div>Wallet</div>
          <div> Status </div>
          <div> Action </div>
        </div>

        <div className={appTheme ? 'table-body light-bg ' : 'table-body'}>
          <div className={appTheme ? 'lightMode_color' : ''}>#</div>
          <div className={appTheme ? 'lightMode_color' : ''}>Contract</div>
          <div className={appTheme ? 'lightMode_color' : ''}>Mode</div>
          <div className={appTheme ? 'lightMode_color' : ''}>Wallet</div>
          <div className={appTheme ? 'lightMode_color' : ''}> Status </div>
          <div className="action-icon">
            <img src={play} alt="" />
            <img src={appTheme ? lightModeEditbtn : edit} alt="" />

            <UseAnimations
              wrapperStyle={{ cursor: 'pointer' }}
              animation={trash2}
              strokeColor="#B60E0E"
              size={25}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TableSection
