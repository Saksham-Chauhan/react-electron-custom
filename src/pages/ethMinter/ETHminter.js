import React, { useEffect, useState } from 'react'
import WalletScreen from './walletScreen/WalletScreen'
import {
  EthMinterLeftSection,
  EthMinterRightSection,
  EthMinterTableSection,
} from '../../pages-component'
import { AppSpacer } from '../../component'
import { useSelector } from 'react-redux'
import {
  fetchActiveNftGroupState,
  fetchThemsState,
} from '../../features/counterSlice'
import { searchingFunction } from '../../hooks/searchFunction'

const MinterScreen = ({ setwalletScreen, activeNftGroup }) => {
  const [tempList, setTempList] = useState([])
  const [search, setSearch] = useState('')
  const appTheme = useSelector(fetchThemsState)
  const theme = {
    leftContainer: appTheme
      ? 'left-container light-mode-left-border'
      : 'left-container',
  }

  useEffect(() => {
    if (Object.keys(activeNftGroup).length > 0) {
      if (activeNftGroup?.minterList?.length > 0) {
        setTempList([...activeNftGroup.minterList])
      } else setTempList([])
    } else setTempList([])
  }, [activeNftGroup])

  const handleSearching = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value.length > 0) {
      const result = searchingFunction(
        value,
        activeNftGroup.minterList,
        'NFT_MINTER',
      )
      if (result.length > 0) {
        setTempList([...result])
      } else setTempList([])
    } else setTempList([...activeNftGroup.minterList])
  }

  return (
    <div className="page-section">
      <div className={theme.leftContainer}>
        <EthMinterLeftSection {...{ activeNftGroup }} />
      </div>
      <div className="right-container">
        <EthMinterRightSection
          setwalletScreen={setwalletScreen}
          {...{ activeNftGroup, handleSearching, search }}
        />
        <AppSpacer spacer={20} />
        <EthMinterTableSection list={tempList} {...{ activeNftGroup }} />
      </div>
    </div>
  )
}

const ETHminter = () => {
  const [walletScreen, setwalletScreen] = useState(false)
  const activeNftGroup = useSelector(fetchActiveNftGroupState)

  return walletScreen ? (
    <WalletScreen {...{ setwalletScreen }} />
  ) : (
    <MinterScreen {...{ setwalletScreen, activeNftGroup }} />
  )
}

export default ETHminter
