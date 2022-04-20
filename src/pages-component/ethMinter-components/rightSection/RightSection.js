import React from "react";
import "./style.css";
import { AppSpacer, GroupStatusCard, TopWrapper } from "../../../component";
import UseAnimations from "react-useanimations";
import add from "../../../assests/images/plus.svg";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import searchIcon from "../../../assests/images/search.svg";
import lightModeplush from "../../../assests/images/lightModeplus.svg";
import EthMinterSetting from "../../../assests/images/EthMinterSetting.svg";
import rightAero from "../../../assests/images/rightAeroImg.svg";
import lightModesearch from "../../../assests/images/lightModesearch.svg";
import { fetchThemsState, setModalState } from "../../../features/counterSlice";
import { useDispatch, useSelector } from "react-redux";

const RightSection = ({ setwalletScreen }) => {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const btnClass = appTheme
    ? "icon-btn-wrapper btn lightBg"
    : "icon-btn-wrapper btn";

  const handleOpenModal = () => {
    dispatch(setModalState("nftTaskModal"));
  };

  return (
    <>
      <TopWrapper>
        <GroupStatusCard subText="88 Tasks Running" title="Group 1" />
      </TopWrapper>
      <AppSpacer spacer={30} />

      <div className="page-top-btns-wrapper padding-horizontal">
        <div className="page-left-container">
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
            <img src={play} alt="" />
          </div>
          <div className={btnClass}>
            <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
          </div>
        </div>

        <div className="walletBtn">
          <div
            className={
              appTheme
                ? "eth-minter-section  btn lightModeSidebar"
                : "eth-minter-section   btn"
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
  );
};

export default RightSection;