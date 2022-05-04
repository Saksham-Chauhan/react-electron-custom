import React from 'react'
import './style.css'
import { AppSpacer, GroupStatusCard, TopWrapper } from '../../../component'
import UseAnimations from 'react-useanimations'
import add from '../../../assests/images/plus.svg'
import play from '../../../assests/images/play.svg'
import lightModeplay from '../../../assests/images/lightMode_play.svg'

import trash2 from 'react-useanimations/lib/trash2'
import searchIcon from '../../../assests/images/search.svg'
import lightModeplush from '../../../assests/images/lightModeplus.svg'
import EthMinterSetting from '../../../assests/images/EthMinterSetting.svg'
import rightAero from '../../../assests/images/rightAeroImg.svg'
import lightModesearch from '../../../assests/images/lightModesearch.svg'
import { fetchThemsState, setModalState } from '../../../features/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMinterGroup } from '../../../features/logic/nft'
import { toastWarning } from '../../../toaster'

const IS_RUNNING = ['Running']

const RightSection = ({
  setwalletScreen,
  activeNftGroup,
  handleSearching,
  search,
}) => {
  const dispatch = useDispatch()
  const appTheme = useSelector(fetchThemsState)
  const theme = {
    btnClass: appTheme
      ? 'icon-btn-wrapper btn light-bg'
      : 'icon-btn-wrapper btn',
    searchContainer: appTheme
      ? 'page-top-search-container light-bg '
      : 'page-top-search-container',
    inputClass: appTheme ? 'light-mode-input' : '',
    minterSection: appTheme
      ? 'eth-minter-section  btn light-mode-sidebar'
      : 'eth-minter-section   btn',
    playIcon: appTheme ? lightModeplay : play,
    searchIcon: appTheme ? lightModesearch : searchIcon,
  }

  const handleOpenModal = () => {
    if (Object.keys(activeNftGroup).length > 0) {
      dispatch(setModalState('nftTaskModal'))
    } else toastWarning('Select Group')
  }

  const handleSettingModal = () => {
    dispatch(setModalState('nftSettingModal'))
  }

  const handleDeleteGroup = () => {
    if (Object.keys(activeNftGroup).length > 0) {
      dispatch(deleteMinterGroup())
    } else toastWarning('Select Group')
  }

  return (
    <>
      <TopWrapper>
        <GroupStatusCard
          subText={` ${
            activeNftGroup['minterList']?.filter((m) =>
              IS_RUNNING.includes(m?.status),
            ).length || 0
          }
          Tasks Running`}
          title={activeNftGroup['minterTitle'] || 'Group 1'}
        />
      </TopWrapper>
      <AppSpacer spacer={30} />

      <div className="page-top-btns-wrapper padding-horizontal">
        <div className="page-left-container">
          <div className={theme.searchContainer}>
            <img src={theme.searchIcon} alt="search-icon" />
            <input
              disabled={Object.keys(activeNftGroup).length === 0}
              value={search}
              onChange={handleSearching}
              placeholder="Search"
              type="search"
              className={theme.inputClass}
            />
          </div>
          <div onClick={handleOpenModal} className={theme.btnClass}>
            <img src={appTheme ? lightModeplush : add} alt="" />
          </div>
          <div className={theme.btnClass}>
            <img src={theme.playIcon} alt="" />
          </div>
          <div className={theme.btnClass}>
            <UseAnimations
              onClick={handleDeleteGroup}
              animation={trash2}
              strokeColor="#B60E0E"
              size={25}
            />
          </div>
        </div>

        <div className="walletBtn">
          <div
            className={theme.minterSection}
            onClick={() => setwalletScreen(true)}
          >
            <span>Wallet Page</span>
            <img src={rightAero} alt="" className="walletBtnImg" />
          </div>
          <div
            onClick={handleSettingModal}
            style={{ marginLeft: '20px' }}
            className={theme.minterSection}
          >
            <img src={EthMinterSetting} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default RightSection
