import React from 'react'
import './style.css'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'

import play from '../../../assests/images/play.svg'
import trash2 from 'react-useanimations/lib/trash2'
import edit from '../../../assests/images/edit.svg'
import stop from '../../../assests/images/stop.svg'
import UseAnimations from 'react-useanimations'
const TableSection = () => {
  const appTheme = useSelector(fetchThemsState)

  return (
    <>
      <div className="minter-table">
        <div className="table-header">
          <div>#</div>
          <div>Contract</div>
          <div>Mode</div>
          <div>Wallet</div>
          <div> Status </div>
          <div> Action </div>
        </div>

        <div className="table-body">
          <div>#</div>
          <div>Contract</div>
          <div>Mode</div>
          <div>Wallet</div>
          <div> Status </div>
          <div>
            <img src={play} alt="" />
            <img src={edit} alt="" />

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
