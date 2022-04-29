import React, { useState } from "react";
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
import stop from "../../../assests/images/stop.svg";
import {
  fetchActiveNftGroupState,
  fetchNftSettingDelaytate,
  fetchNftSettingRPCState,
  fetchNftWalletListState,
  fetchThemsState,
  setModalState,
} from "../../../features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMinterGroup,
  editTaskInGroup,
} from "../../../features/logic/nft";
import { toastWarning } from "../../../toaster";
import { handleMinting } from "../../../helper/nft-minter";
import { sendLogs } from "../../../helper/electron-bridge";
import { sleep } from "../../../helper";

const IS_RUNNING = ["running"];

const RightSection = ({
  setwalletScreen,
  activeNftGroup,
  handleSearching,
  search,
}) => {
  const [flag, setFlag] = useState(true);
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const activeGroup = useSelector(fetchActiveNftGroupState);
  const rpcURL = useSelector(fetchNftSettingRPCState);
  const delay = useSelector(fetchNftSettingDelaytate);
  const walletList = useSelector(fetchNftWalletListState);

  // minterList
  const btnClass = appTheme
    ? "icon-btn-wrapper btn lightBg"
    : "icon-btn-wrapper btn";

  const handleOpenModal = () => {
    if (Object.keys(activeNftGroup).length > 0) {
      dispatch(setModalState("nftTaskModal"));
    } else toastWarning("Select Group");
  };

  const handleSettingModal = () => {
    dispatch(setModalState("nftSettingModal"));
  };

  const handleDeleteGroup = () => {
    if (Object.keys(activeNftGroup).length > 0) {
      dispatch(deleteMinterGroup());
    } else toastWarning("Select Group");
  };

  const handleEditTaskStatus = (task) => {
    dispatch(editTaskInGroup(task));
  };

  const onPlayAll = async () => {
    setFlag(false);
    let taskList = activeGroup.minterList;
    let tempObj = {};
    for (let i = 0; i < taskList.length; i++) {
      tempObj = { ...taskList[i] };
      tempObj["wallet"] = {};
      if (tempObj.status !== "success" && tempObj.status !== "running") {
        for (let j = 0; j < walletList.length; j++) {
          if (walletList[j].id === tempObj.walletID) {
            tempObj.wallet["walletPublicKey"] = walletList[j].walletPublicKey;
            tempObj.wallet["walletPrivateKey"] = walletList[j].walletPrivateKey;
          }
        }
        let log;
        try {
          handleMinting(tempObj, rpcURL, handleEditTaskStatus, true, delay);
          log = `Start minting the task with id -> ${tempObj.id}`;
        } catch (e) {
          log = `Error in minting the task with id -> ${tempObj.id}`;
        }
        sendLogs(log);
        await sleep(delay);
      }
    }
    setFlag(true);
  };

  return (
    <>
      <TopWrapper>
        <GroupStatusCard
          subText={` ${
            activeNftGroup["minterList"]?.filter((m) =>
              IS_RUNNING.includes(m?.status)
            ).length || 0
          }
          Tasks Running`}
          title={activeNftGroup["minterTitle"] || "Group 1"}
        />
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
              disabled={Object.keys(activeNftGroup).length === 0}
              value={search}
              onChange={handleSearching}
              placeholder="Search"
              type="search"
              className={appTheme ? "lightModeInput" : ""}
            />
          </div>
          <div onClick={handleOpenModal} className={btnClass}>
            <img src={appTheme ? lightModeplush : add} alt="" />
          </div>
          <div className={btnClass}>
            <img src={flag ? play : stop} alt="refresh" onClick={onPlayAll} />
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
                ? "eth-minter-section  btn lightModeSidebar"
                : "eth-minter-section   btn"
            }
            onClick={() => setwalletScreen(true)}
          >
            <span>Wallet Page</span>
            <img src={rightAero} alt="" className="walletBtnImg" />
          </div>
          <div onClick={handleSettingModal} className={btnClass}>
            <img src={EthMinterSetting} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSection;
