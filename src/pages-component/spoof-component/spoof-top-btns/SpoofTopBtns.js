import React from 'react'
import {
  stopSpoofer,
  startSpoofer,
  deleteSpoofer,
  launchSpoofer,
} from '../../../helper/electron-bridge'
import { useDispatch, useSelector } from 'react-redux'
import { toastWarning } from '../../../toaster'
import play from '../../../assests/images/play.svg'
import lightModePlay from '../../../assests/images/lightMode_play.svg'
import plus from '../../../assests/images/plus.svg'
import stop from '../../../assests/images/stop.svg'
import searchIcon from '../../../assests/images/search.svg'
import lightModesearch from '../../../assests/images/lightModesearch.svg'
import lightModeplush from '../../../assests/images/lightModeplus.svg'
import UseAnimations from 'react-useanimations'
import trash2 from 'react-useanimations/lib/trash2'
import {
  appendSpooferInList,
  fetchThemsState,
  setModalState,
} from '../../../features/counterSlice'

function SpoofTopBtns({ tableList, search, handleSearching }) {
  const dispatch = useDispatch()
  const handleOpenModal = () => {
    dispatch(setModalState('spoofModal'))
  }
  const appTheme = useSelector(fetchThemsState)
  const theme = {
    btnClass: appTheme
      ? 'icon-btn-wrapper btn light-bg'
      : 'icon-btn-wrapper btn',
    searchContainer: appTheme
      ? 'page-top-search-container light-bg'
      : 'page-top-search-container',
    inputClass: appTheme ? 'light-mode-input' : '',
    removeBtnIcon: appTheme
      ? 'btn-with-no-icon btn remove-btn light-bg'
      : 'btn-with-no-icon btn remove-btn',
    spanStyle: { color: appTheme ? '#076366' : '' },
    searchIcon: appTheme ? lightModesearch : searchIcon,
    playIcon: appTheme ? lightModePlay : play,
    plusIcon: appTheme ? lightModeplush : plus,
  }

  const handleAll = (key) => {
    if (tableList.length > 0) {
      if (!tableList.proxyValue) {
        toastWarning('No proxy found. Using system proxy.')
      }
      tableList.forEach((spoof) => {
        if (key === 'LAUNCH') {
          launchSpoofer(spoof)
        } else if (key === 'START') {
          startSpoofer(spoof)
        } else if (key === 'STOP') {
          stopSpoofer(spoof)
        } else {
          deleteSpoofer(spoof)
          dispatch(appendSpooferInList([]))
        }
      })
    } else toastWarning('Create some spoof')
  }

  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container spoofer-page">
        <div className={theme.searchContainer}>
          <img src={theme.searchIcon} alt="search-icon" />
          <input
            value={search}
            onChange={handleSearching}
            placeholder="Search"
            type="search"
            className={theme.inputClass}
          />
        </div>

        <div onClick={handleOpenModal} className={theme.btnClass}>
          <img src={theme.plusIcon} alt="" />
        </div>
        <div onClick={() => handleAll('START')} className={theme.btnClass}>
          <img src={theme.playIcon} alt="" />
        </div>
        <div onClick={() => handleAll('STOP')} className={theme.btnClass}>
          <img src={stop} alt="" />
        </div>
        <div onClick={() => handleAll('DELETE')} className={theme.btnClass}>
          <UseAnimations
            animation={trash2}
            strokeColor="#B60E0E"
            size={25}
            wrapperStyle={{ cursor: 'pointer', paddingBottom: '2px' }}
          ></UseAnimations>
        </div>
        <div
          onClick={() => handleAll('LAUNCH')}
          className={theme.removeBtnIcon}
        >
          <span style={theme.spanStyle}>Launch All</span>
        </div>
      </div>
    </div>
  )
}

export default SpoofTopBtns
