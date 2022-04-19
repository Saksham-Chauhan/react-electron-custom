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
import { fetchThemsState, setModalState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'
const RightSection = ({ setwalletScreen }) => {
  const appTheme = useSelector(fetchThemsState)
  const btnClass = appTheme
    ? 'icon-btn-wrapper btn lightBg'
    : 'icon-btn-wrapper btn'
  return (
    <>
      <TopWrapper>
        <GroupStatusCard subText="88 Tasks Running" title="Group 1" />
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
            <img src={play} alt="" />
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
            onClick={() => setwalletScreen(true)}
          >
            <span>Wallet Page</span>
            <img src={rightAero} alt="" className="walletBtnImg" />
          </div>
          <div className={btnClass}>
            <img src={EthMinterSetting} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default RightSection
