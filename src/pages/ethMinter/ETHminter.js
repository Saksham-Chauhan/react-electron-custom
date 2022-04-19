import React, { useState } from 'react'
import WalletScreen from './walletScreen/WalletScreen'
import {
  EthMinterLeftSection,
  EthMinterRightSection,
} from '../../pages-component'

const MinterScreen = ({ setwalletScreen }) => {
  return (
    <div className="page-section">
      <div className="left-container">
        <EthMinterLeftSection />
      </div>
      <div className="right-container invite-joiner">
        <EthMinterRightSection setwalletScreen={setwalletScreen} />
      </div>
    </div>
  )
}

const ETHminter = () => {
  const [walletScreen, setwalletScreen] = useState(false)
  const handleOpenModal = () => {}

  return walletScreen ? (
    <WalletScreen {...{ setwalletScreen }} />
  ) : (
    <MinterScreen {...{ setwalletScreen }} />
  )
}

export default ETHminter
