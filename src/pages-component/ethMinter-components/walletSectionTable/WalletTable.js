import React from 'react'
import './style.css'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'

const WalletTable = () => {
  const appTheme = useSelector(fetchThemsState)

  return (
    <div className="wallet-table-section">
      <div className="acc-chnager-table-header-parent">
        <div
          className={
            appTheme
              ? 'acc-chnager-page-table-header light-mode-active-link'
              : 'acc-chnager-page-table-header'
          }
        >
          <div>#</div>
          <div>Wallet Nickname</div>
          <div>Wallet Address</div>
          <div>Wallet Balance</div>
          <div>Actions</div>
        </div>
      </div>
      <div className="acc-changer-table-scroller"></div>
    </div>
  )
}

export default WalletTable
