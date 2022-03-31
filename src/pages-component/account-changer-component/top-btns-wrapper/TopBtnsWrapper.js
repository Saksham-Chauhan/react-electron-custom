import React from "react";
import { useDispatch } from "react-redux";
import UseAnimations from "react-useanimations";
import add from "../../../assests/images/plus.svg";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import searchIcon from "../../../assests/images/search.svg";
import { setModalState } from "../../../features/counterSlice";
import {
  deleteAllTableRow,
  updateStatusOfTableRow,
} from "../../../features/logic/acc-changer";
import { apiCallToDiscord } from "../table-section/TableSection";
import { sleep } from "../../../helper";

function TopBtnsWrapper({ search, handleSearching, selectedCard }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(setModalState("accountChangerModal"));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTableRow());
  };

  const handleSinglePlay = async (obj) => {
    const type = selectedCard["changerType"];
    const { proxyGroup, claimerGroup } = obj;
    const tokenArray = claimerGroup["value"]?.split("\n");
    for (let index = 0; index < tokenArray.length; index++) {
      const token = tokenArray[index];
      const tokenArr = token?.split(":");
      const proxyArray = proxyGroup["value"].split("\n");
      for (let j = 0; j < proxyArray.length; j++) {
        let proxySplit = proxyArray[j]?.split(":");
        const proxy = {
          host: proxySplit[0],
          port: proxySplit[1],
          auth: {
            username: proxySplit[2],
            password: proxySplit[3],
          },
        };
        dispatch(updateStatusOfTableRow(obj, "Running"));
        const apiResponse = await apiCallToDiscord({
          type,
          token: tokenArr[3],
          proxy,
          username: obj.username,
          password: tokenArr[2],
          guildId: obj.serverIDs,
          activityDetail: obj.activityDetails,
          nickName: obj.nicknameGenerate,
          currentPass: tokenArr[2],
          newPass: obj.commonPassword,
          invideCodes: obj.inviteCodes,
        });
        if (apiResponse.status === 200) {
          dispatch(updateStatusOfTableRow(obj, "Completed"));
        } else {
          dispatch(updateStatusOfTableRow(obj, "Stopped"));
        }
        await sleep(Number(obj.delay) || 3000);
      }
    }
  };

  const handlePlayAll = () => {
    if (selectedCard["list"]?.length > 0) {
      selectedCard["list"]?.forEach(async (data) => {
        await handleSinglePlay(data);
      });
    }
  };

  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container">
        <div className="page-top-search-container">
          <img src={searchIcon} alt="search-icon" />
          <input
            value={search}
            onChange={handleSearching}
            placeholder="Search"
            type="search"
          />
        </div>
        <div onClick={handleAdd} className="icon-btn-wrapper btn">
          <img src={add} alt="" />
        </div>
        <div onClick={handlePlayAll} className="icon-btn-wrapper btn">
          <img src={play} alt="" />
        </div>
        <div onClick={handleDeleteAll} className="icon-btn-wrapper btn">
          <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
        </div>
      </div>
    </div>
  );
}

export default TopBtnsWrapper;
