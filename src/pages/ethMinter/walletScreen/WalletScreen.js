import React from 'react'
import { AppSpacer, GroupStatusCard, TopWrapper } from '../../../component'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'

import EthMinterSetting from '../../../assests/images/EthMinterSetting.svg'
import leftAero from '../../../assests/images/leftAero.svg'
import UseAnimations from 'react-useanimations'
import add from '../../../assests/images/plus.svg'
import processIcon from '../../../assests/images/process.svg'
import trash2 from 'react-useanimations/lib/trash2'
import searchIcon from '../../../assests/images/search.svg'
import lightModeplush from '../../../assests/images/lightModeplus.svg'
import lightModesearch from '../../../assests/images/lightModesearch.svg'

import { WalletTable } from '../../../pages-component'
const WalletScreen = ({ setwalletScreen }) => {
  const appTheme = useSelector(fetchThemsState)
  const btnClass = appTheme
    ? 'icon-btn-wrapper btn lightBg'
    : 'icon-btn-wrapper btn'
  return (
    <>
      <TopWrapper>
        <GroupStatusCard subText="10 Wallets Connected" title="Wallet" />
      </TopWrapper>
      <AppSpacer spacer={30} />

      <div className="page-top-btns-wrapper">
        <div className="page-left-container" style={{ paddingLeft: '15px' }}>
          <div
            className={
              appTheme
                ? 'page-top-search-container lightBg '
                : 'page-top-search-container'
            }
          >
            <img
              src={appTheme ? lightModesearch : searchIcon}
              alt="search-icon"
            />
            <input
              placeholder="Search"
              type="search"
              className={appTheme ? 'lightModeInput' : ''}
            />
          </div>
          <div className={btnClass}>
            <img src={appTheme ? lightModeplush : add} alt="" />
          </div>
          <div className={btnClass}>
            <img src={processIcon} alt="" />
          </div>
          <div className={btnClass}>
            <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
          </div>
        </div>

        <div className="walletBtn">
          <div
            style={{ padding: '0.8em 1em' }}
            className={
              appTheme
                ? 'switch-with-text with-no-toggle btn lightModeSidebar'
                : 'switch-with-text with-no-toggle btn'
            }
            onClick={() => setwalletScreen(false)}
          >
            <img src={leftAero} alt="" className="walletBtnImg" />
            <span>Task Page</span>
          </div>
          <div className={btnClass}>
            <img src={EthMinterSetting} alt="" />
          </div>
        </div>
      </div>
      <AppSpacer spacer={30} />
      <WalletTable />
    </>
  )
}

export default WalletScreen
