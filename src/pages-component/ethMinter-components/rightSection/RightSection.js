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
  const btnClass = appTheme
    ? 'icon-btn-wrapper btn light-bg'
    : 'icon-btn-wrapper btn'

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
          <div
            className={
              appTheme
                ? 'page-top-search-container light-bg '
                : 'page-top-search-container'
            }
          >
            <img
              src={appTheme ? lightModesearch : searchIcon}
              alt="search-icon"
            />
            <input
              disabled={Object.keys(activeNftGroup).length === 0}
              value={search}
              onChange={handleSearching}
              placeholder="Search"
              type="search"
              className={appTheme ? 'light-mode-input' : ''}
            />
          </div>
          <div onClick={handleOpenModal} className={btnClass}>
            <img src={appTheme ? lightModeplush : add} alt="" />
          </div>
          <div className={btnClass}>
            <img src={play} alt="" />
          </div>
          <div className={btnClass}>
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
            className={
              appTheme
                ? 'eth-minter-section  btn light-mode-sidebar'
                : 'eth-minter-section   btn'
            }
            onClick={() => setwalletScreen(true)}
          >
            <span>Wallet Page</span>
            <img src={rightAero} alt="" className="walletBtnImg" />
          </div>
          <div
            onClick={handleSettingModal}
            style={{ marginLeft: '20px' }}
            className={
              appTheme
                ? 'eth-minter-section  btn light-mode-sidebar'
                : 'eth-minter-section   btn'
            }
          >
            <img src={EthMinterSetting} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default RightSection
