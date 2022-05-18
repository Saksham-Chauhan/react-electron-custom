import React from "react";
import { useDispatch } from "react-redux";
import { deleteAllTableRow } from "../../../features/logic/acc-changer";
import UseAnimations from "react-useanimations";
import add from "../../../assests/images/plus.svg";
import play from "../../../assests/images/play.svg";
import lightModePlay from "../../../assests/images/lightMode_play.svg";
import trash2 from "react-useanimations/lib/trash2";
import searchIcon from "../../../assests/images/search.svg";
import lightModeplush from "../../../assests/images/lightModeplus.svg";
import lightModesearch from "../../../assests/images/lightModesearch.svg";
import {
  fetchLoggedUserDetails,
  fetchThemsState,
  fetchWebhookListState,
  fetchWebhookSettingState,
  setModalState,
} from "../../../features/counterSlice";

import { useSelector } from "react-redux";
import {
  useActivityChanger,
  useAvatarChanger,
  useMassInviteJoiner,
  useNickNameChanger,
  usePasswordChanger,
  useServerLeaver,
  useTokeChecker,
  useTokenRetriever,
  useUserName,
} from "../../../hooks/discord-api";

import {
  startInviteJoinerMonitor,
  startLinkOpenerMonitor,
} from "../../../helper/electron-bridge";
import { sleep } from "../../../helper";

function TopBtnsWrapper({ search, handleSearching, tempList }) {
  const dispatch = useDispatch();
  const massjoiner = useMassInviteJoiner();
  const serverLeaver = useServerLeaver();
  const activityChanger = useActivityChanger();
  const userName = useUserName();
  const nickName = useNickNameChanger();
  const tokenRetriever = useTokenRetriever();
  const avatarChanger = useAvatarChanger();
  const tokenChecker = useTokeChecker();
  const passwordChanger = usePasswordChanger();
  const appTheme = useSelector(fetchThemsState);

  const setting = useSelector(fetchWebhookSettingState);
  const user = useSelector(fetchLoggedUserDetails);
  const webhookList = useSelector(fetchWebhookListState);

  const theme = {
    btnClass: appTheme
      ? "icon-btn-wrapper btn light-bg"
      : "icon-btn-wrapper btn",
    inputContainer: appTheme
      ? "page-top-search-container light-bg"
      : "page-top-search-container",
    searchIcon: appTheme ? lightModesearch : searchIcon,
    inputClass: appTheme ? "light-mode-input" : "",
    plusIcon: appTheme ? lightModeplush : add,
    playIcon: appTheme ? lightModePlay : play,
  };

  const handleAdd = () => {
    dispatch(setModalState("accountChangerModal"));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTableRow());
  };

  const handleSinglePlay = async (obj) => {
    const type = obj["changerType"];
    if (type === "massInviter") {
      await massjoiner(obj, setting, user, webhookList);
    } else if (type === "serverLeaver") {
      await serverLeaver(obj, setting, user, webhookList);
    } else if (type === "usernameChanger") {
      await userName(obj, setting, user, webhookList);
    } else if (type === "activityChanger") {
      await activityChanger(obj, setting, user, webhookList);
    } else if (type === "nicknameChanger") {
      await nickName(obj, setting, user, webhookList);
    } else if (type === "passwordChanger") {
      await passwordChanger(obj, setting, user, webhookList);
    } else if (type === "tokenChecker") {
      await tokenChecker(obj, setting, user, webhookList);
    } else if (type === "tokenRetrieve") {
      await tokenRetriever(obj, setting, user, webhookList);
    } else if (type === "avatarChanger") {
      await avatarChanger(obj, setting, user, webhookList);
    } else if (type === "xpFarmer") {
      // const { proxyGroup } = obj;
      // const proxy = getProxy(proxyGroup["value"].split("\n"));
      // if (status) {
      //   const res = await callApis(
      //     proxy,
      //     obj.channelId,
      //     obj.monitorToken,
      //     obj.delay
      //   );
      //   return res;
      // } else return null;
    } else if (type === "linkOpener") {
      startLinkOpenerMonitor(obj, setting, user, webhookList);
    } else if (type === "inviteJoiner") {
      startInviteJoinerMonitor(obj, setting, user, webhookList);
    }
  };

  const handlePlayAll = () => {
    if (tempList?.length > 0) {
      tempList?.forEach(async (data) => {
        await sleep(data.delay);
        await handleSinglePlay(data);
      });
    }
  };

  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container">
        <div className={theme.inputContainer}>
          <img src={theme.searchIcon} alt="search-icon" />
          <input
            value={search}
            onChange={handleSearching}
            placeholder="Search"
            type="search"
            className={theme.inputClass}
          />
        </div>
        <div onClick={handleAdd} className={theme.btnClass}>
          <img src={theme.plusIcon} alt="" />
        </div>
        <div onClick={handlePlayAll} className={theme.btnClass}>
          <img src={theme.playIcon} alt="" />
        </div>
        <div onClick={handleDeleteAll} className={theme.btnClass}>
          <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
        </div>
      </div>
    </div>
  );
}

export default TopBtnsWrapper;
