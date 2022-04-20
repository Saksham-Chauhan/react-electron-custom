import React from "react";
import { AppSpacer, GroupStatusCard, TopWrapper } from "../../../component";
import {
  fetchThemsState,
  setModalState,
  setNftWalletList,
} from "../../../features/counterSlice";
import { useDispatch, useSelector } from "react-redux";

import EthMinterSetting from "../../../assests/images/EthMinterSetting.svg";
import leftAero from "../../../assests/images/leftAero.svg";
import UseAnimations from "react-useanimations";
import add from "../../../assests/images/plus.svg";
import processIcon from "../../../assests/images/process.svg";
import trash2 from "react-useanimations/lib/trash2";
import searchIcon from "../../../assests/images/search.svg";
import lightModeplush from "../../../assests/images/lightModeplus.svg";
import lightModesearch from "../../../assests/images/lightModesearch.svg";

import { WalletTable } from "../../../pages-component";
const WalletScreen = ({ setwalletScreen }) => {
  const appTheme = useSelector(fetchThemsState);
  const dispatch = useDispatch();
  const btnClass = appTheme
    ? "icon-btn-wrapper btn lightBg"
    : "icon-btn-wrapper btn";

  const handleOpenModal = () => {
    dispatch(setModalState("nftWalletModal"));
  };

  const handleDeleteAll = () => {
    dispatch(setNftWalletList([]));
  };

  return (
    <>
      <TopWrapper>
        <GroupStatusCard subText="10 Wallets Connected" title="Wallet" />
      </TopWrapper>
      <AppSpacer spacer={30} />

      <div className="page-top-btns-wrapper padding-horizontal">
        <div className="page-left-container ">
          <div
            className={
              appTheme
                ? "page-top-search-container lightBg "
                : "page-top-search-container"
            }
          >
            <img
              src={appTheme ? lightModesearch : searchIcon}
              alt="search-icon"
            />
            <input
              placeholder="Search"
              type="search"
              className={appTheme ? "lightModeInput" : ""}
            />
          </div>
          <div onClick={handleOpenModal} className={btnClass}>
            <img src={appTheme ? lightModeplush : add} alt="" />
          </div>
          <div className={btnClass}>
            <img src={processIcon} alt="" />
          </div>
          <div onClick={handleDeleteAll} className={btnClass}>
            <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
          </div>
        </div>

        <div className="walletBtn">
          <div
            className={
              appTheme
                ? "eth-minter-section with-no-toggle btn lightModeSidebar"
                : "eth-minter-section with-no-toggle btn"
            }
            onClick={() => setwalletScreen(false)}
          >
            <img src={leftAero} alt="" className="walletBtnImg" />
            <span className="no-margin">Task Page</span>
          </div>
          <div className={btnClass}>
            <img src={EthMinterSetting} alt="" />
          </div>
        </div>
      </div>
      <AppSpacer spacer={30} />
      <div className="padding-horizontal">
        <WalletTable />
      </div>
    </>
  );
};

export default WalletScreen;