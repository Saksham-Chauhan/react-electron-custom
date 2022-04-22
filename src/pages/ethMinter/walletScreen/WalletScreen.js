import React, { useEffect, useState } from 'react'
import { AppSpacer, GroupStatusCard, TopWrapper } from '../../../component'
import {
  fetchNftWalletListState,
  fetchThemsState,
  setModalState,
  setNftWalletList,
} from '../../../features/counterSlice'
import { useDispatch, useSelector } from 'react-redux'

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
import { searchingFunction } from '../../../hooks/searchFunction'
import { sendLogs } from '../../../helper/electron-bridge'
const WalletScreen = ({ setwalletScreen }) => {
  const [tempList, setTempList] = useState([])
  const appTheme = useSelector(fetchThemsState)
  const walletList = useSelector(fetchNftWalletListState)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const theme = {
    btnClass: appTheme
      ? 'icon-btn-wrapper btn light-bg'
      : 'icon-btn-wrapper btn',
    inputContainer: appTheme
      ? 'page-top-search-container light-bg '
      : 'page-top-search-container',
    inputClass: appTheme ? 'light-mode-input' : '',
    minterSection: appTheme
      ? 'eth-minter-section with-no-toggle btn light-mode-sidebar'
      : 'eth-minter-section with-no-toggle btn',
    searchIcon: appTheme ? lightModesearch : searchIcon,
    plusIcon: appTheme ? lightModeplush : add,
  }

  useEffect(() => {
    if (walletList?.length > 0) {
      setTempList([...walletList])
    } else setTempList([])
  }, [walletList])

  const handleOpenModal = () => {
    dispatch(setModalState('nftWalletModal'))
  }

  const handleDeleteAll = () => {
    const log = `All ${walletList.length} wallet is deleted`
    sendLogs(log)
    dispatch(setNftWalletList([]))
  }

  const handleSettingModal = () => {
    dispatch(setModalState('nftSettingModal'))
  }

  const handleSearching = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value.length > 0) {
      const result = searchingFunction(value, walletList, 'NFT_WALLET')
      if (result.length > 0) {
        setTempList([...result])
      } else setTempList([])
    } else setTempList([...walletList])
  }

  return (
    <>
      <TopWrapper>
        <GroupStatusCard subText="10 Wallets Connected" title="Wallet" />
      </TopWrapper>
      <AppSpacer spacer={30} />
      <div className="page-top-btns-wrapper padding-horizontal">
        <div className="page-left-container ">
          <div className={theme.inputContainer}>
            <img src={theme.searchIcon} alt="search-icon" />
            <input
              placeholder="Search"
              onChange={handleSearching}
              value={search}
              type="search"
              className={theme.inputClass}
            />
          </div>
          <div onClick={handleOpenModal} className={theme.btnClass}>
            <img src={theme.plusIcon} alt="" />
          </div>
          <div className={theme.btnClass}>
            <img src={processIcon} alt="" />
          </div>
          <div onClick={handleDeleteAll} className={theme.btnClass}>
            <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
          </div>
        </div>

        <div className="walletBtn">
          <div
            className={theme.minterSection}
            onClick={() => setwalletScreen(false)}
          >
            <img src={leftAero} alt="" className="walletBtnImg" />
            <span className="no-margin">Task Page</span>
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
      <AppSpacer spacer={30} />
      <div className="padding-horizontal">
        <WalletTable walletList={tempList} />
      </div>
    </>
  )
}

export default WalletScreen
