import React, { useState } from "react";
import WalletScreen from "./walletScreen/WalletScreen";
import {
  EthMinterLeftSection,
  EthMinterRightSection,
  EthMinterTableSection,
} from "../../pages-component";
import { AppSpacer } from "../../component";
import { useSelector } from "react-redux";
import { fetchActiveNftGroupState } from "../../features/counterSlice";

const MinterScreen = ({ setwalletScreen, activeNftGroup }) => {
  return (
    <div className="page-section">
      <div className="left-container">
        <EthMinterLeftSection {...{ activeNftGroup }} />
      </div>
      <div className="right-container">
        <EthMinterRightSection setwalletScreen={setwalletScreen} />
        <AppSpacer spacer={20} />
        <EthMinterTableSection {...{ activeNftGroup }} />
      </div>
    </div>
  );
};

const ETHminter = () => {
  const [walletScreen, setwalletScreen] = useState(false);
  const activeNftGroup = useSelector(fetchActiveNftGroupState);
  return walletScreen ? (
    <WalletScreen {...{ setwalletScreen }} />
  ) : (
    <MinterScreen {...{ setwalletScreen, activeNftGroup }} />
  );
};

export default ETHminter;
