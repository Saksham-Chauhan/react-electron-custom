import React from 'react'
import './style.css'
import { AppSpacer, GroupStatusCard, TopWrapper } from '../../../component'
import UseAnimations from 'react-useanimations'
import add from '../../../assests/images/plus.svg'
import play from '../../../assests/images/play.svg'
import trash2 from 'react-useanimations/lib/trash2'
import searchIcon from '../../../assests/images/search.svg'
import lightModeplush from '../../../assests/images/lightModeplus.svg'
import EthMinterSetting from '../../../assests/images/EthMinterSetting.svg'
import rightAero from '../../../assests/images/rightAeroImg.svg'
import lightModesearch from '../../../assests/images/lightModesearch.svg'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'
const RightSection = ({ setwalletScreen }) => {
  const appTheme = useSelector(fetchThemsState)

  const lightTheme = {
    btnClass: appTheme
      ? 'icon-btn-wrapper btn light-bg'
      : 'icon-btn-wrapper btn',
    linkClass: appTheme
      ? 'switch-with-text with-no-toggle btn light-mode-sidebar'
      : 'switch-with-text with-no-toggle btn',
    inputContainer: appTheme
      ? 'page-top-search-container light-bg '
      : 'page-top-search-container',
    searchIcon: appTheme ? lightModesearch : searchIcon,
    inputClass: appTheme ? 'light-mode-input' : '',
    plusBtn: appTheme ? lightModeplush : add,
  }

  return (
    <>
      <TopWrapper>
        <GroupStatusCard subText="88 Tasks Running" title="Group 1" />
      </TopWrapper>
      <AppSpacer spacer={30} />

      <div className="page-top-btns-wrapper">
        <div className="page-left-container" style={{ paddingLeft: '15px' }}>
          <div className={lightTheme.inputContainer}>
            <img src={lightTheme.searchIcon} alt="search-icon" />
            <input
              placeholder="Search"
              type="search"
              className={lightTheme.inputClass}
            />
          </div>
          <div className={lightTheme.btnClass}>
            <img src={lightTheme.plusBtn} alt="" />
          </div>
          <div className={lightTheme.btnClass}>
            <img src={play} alt="" />
          </div>
          <div className={lightTheme.btnClass}>
            <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
          </div>
        </div>

        <div className="walletBtn">
          <div
            style={{ padding: '0.8em 1em' }}
            className={lightTheme.linkClass}
            onClick={() => setwalletScreen(true)}
          >
            <span>Wallet Page</span>
            <img src={rightAero} alt="" className="walletBtnImg" />
          </div>
          <div className={lightTheme.linkClass}>
            <img src={EthMinterSetting} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default RightSection
